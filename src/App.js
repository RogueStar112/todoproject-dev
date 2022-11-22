import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoInput from './components/todoinput/ToDoInput.js';
import ToDoInputMobile from './components/todoinput/ToDoInputMobile';
import ToDoOutput from './components/todooutput/ToDoOutput.js';

import data from "./data.json";
import presets from "./presets.json";
import statistics from "./statistics.json";

import ToDoPreset from './components/todopresets/ToDoPreset';
import ToDoPresetTitle from './components/todopresets/ToDoPresetTitle';
import ToDoPresetList from './components/todopresets/ToDoPresetList';
import SaveToDoPreset from './components/todopresets/SaveToDoPreset';

import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClearTasksButton from './components/todoinput/ClearTasksButton';

import TagFilter from './components/todoinput/TagFilter.js';
import TagFilterMobile from './components/todoinput/TagFilterMobile.js';

import ToDoStatistics from './components/todooutput/ToDoStatistics';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useLocalStorage } from './useLocalStorage';
import { daysToWeeks } from 'date-fns';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function App() {



const date = new Date();

/*
if (localStorage.getItem("data") === null) {

} else {
  data = localStorage.getItem("data")
  data = JSON.parse(data);
  console.log("DATA", data);
}
*/

var userTimezoneOffset = date.getTimezoneOffset() * 60000;
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const currentDateTime = date.toLocaleString();

//const currentDateTime = Math.floor(date.getTime() / 1000);

const [counter, setCounter] = useState(currentDateTime);


useEffect(() => {

  const interval = setInterval(() => {
    setCounter((prevCounter) => prevCounter + 1)
  }, 1000);

  return () => clearInterval(interval);

}, [counter]);  


const [ toDoList, setToDoList ] = useLocalStorage('data', data || []);

let [ toDoListHistory, setToDoListHistory ] = useLocalStorage('data_history', data || []);

const [ presetData, setPresetData ] = useLocalStorage('presets', presets || []);

let [ statisticsData, setStatisticsData ] = useLocalStorage('statistics', statistics || {});

/*
var i;


console.log("local storage");

for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
*/

//localStorage.clear();

// thanks to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:619-796

const addMultipleTasks = (tasks) => {

  let copy = [...toDoList];

  tasks.forEach((task, index) => {
    
    let task_time_newDate = new Date(task.time)

    let currentDate = new Date();

    let task_time_getdate = task_time_newDate.getDate();

    //let oneDayAhead = task_time_newDate.setDate(task_time_getdate + 1);

    if (task_time_newDate < Date.parse(currentDate)) {

      task.time = new Date(task_time_getdate);
    
    } else {

      //task.time = new Date(oneDayAhead);
 
    }
    

    copy = [...copy, { id: toDoList.length + index+1, task: task.task, time: task.time, tags: task.tags, complete: false, onTime: true, isSearched: false, subtasks: [], bg: task.bg }];
  });

  setToDoList(copy);
  
  //setToDoListHistory(copy);

}

const addTask = (userInput_task, userInput_tags, userInput_bg, userInput_date) => {

  //console.log('FUNCTION CALL')

  if (userInput_tags === "") {
    userInput_tags = ['untagged'];
  }

  /*
  if (userInput_date == null) {
    userInput_date = new Date(); 
  }
  */



  // removes spaces and uses commas to separate tags!

  //console.log("uI TAGS", userInput_tags);

  if (Array.isArray(userInput_tags)) {
    
  } else {
  userInput_tags = userInput_tags.replace(/\s/g, '')
  userInput_tags = userInput_tags.toLowerCase();
  userInput_tags = userInput_tags.split(',')
  }


  let copy = [...toDoList];
  copy = [...copy, { id: toDoList.length + 1, task: userInput_task, time: userInput_date, tags: userInput_tags, complete: false, onTime: true, isSearched: false, subtasks: [], bg: userInput_bg }];
  setToDoList(copy);

  //setToDoListHistory(copy);
  
  //console.log("STDL", toDoList);
  
  //localStorage.setItem('data', JSON.stringify(toDoList));

}

 const toggleTask = (id) => {

  let mapped = toDoList.map(task => {
    return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
  });

   setToDoList(mapped)
 }

 const removeTasks = (addStatistics) => {


  if (toDoList === undefined || toDoList === null || toDoList == "") {

    if (addStatistics === true) {
    
      alert("There are no tasks to publish! Create a task first.")
    } else {
      alert("There are no tasks to discard! Create a task first.")

    }
  } else {

  
      let filtered = toDoList.filter(task => {
          return !task.complete; 
      });

      // Filtered True. Returns a Filter of tasks that are complete. (highlighted in light blue)
      let filteredTrue = toDoList.filter(task => {
        return task.complete === true;
      })


      if (filteredTrue.length === 0) {
        alert('You must select a task first!')
      } else {


        //setStatisticsData([])

        if (addStatistics === true) {

          console.log("FILTERED TRUE", filteredTrue);
          //let newStatisticsData = []

          let newHistoryData = toDoListHistory ? toDoListHistory : [];

          let currentTime = new Date();

          currentTime = currentTime.toLocaleString()

          newHistoryData = [...toDoListHistory, {history_id: toDoListHistory.length + 1, timeLogged: currentTime, data: filteredTrue}];

          let newStatisticsData = statisticsData ? statisticsData : {};

          filteredTrue.forEach(task => {
            task.tags.forEach(tag => {

              if (newStatisticsData[tag] == null) {
                newStatisticsData[tag] = {};

                if (task.onTime == true) {
                  newStatisticsData[tag]['complete'] = 1;
                  newStatisticsData[tag]['onTime'] = 1;
                } else {
                  newStatisticsData[tag]['complete'] = 1;
                }
              } else {

                if (task.onTime == true) {
                  newStatisticsData[tag]['complete'] += 1;
                  newStatisticsData[tag]['onTime'] += 1;
                } else {
                  newStatisticsData[tag]['complete'] += 1;
                }
              }
            })

          
          
          //newStatisticsData.push(statisticsData);
          })
            //newStatisticsData = {...statisticsData, labels: {tagName: }, data: []}


          //statisticsData.push()



          // console.log("NSDATA", newStatisticsData);

          statisticsData = {...newStatisticsData};

          // console.log(statisticsData);

          console.log('TDH HISTORY', newHistoryData)
          setToDoListHistory(newHistoryData);
          setStatisticsData(statisticsData);

          //console.log("NSDATA AFTER", newStatisticsData)
          
        } else {
          // do nothing
        }

        //setToDoListHistory(filtered);

        //toDoListHistory = {...filtered};

        
        setToDoList(filtered);

      }
    }
}

const clearStatistics = () => {

  let choice = "Are you sure you want to clear the statistics?"

  if (window.confirm(choice)) {
    setStatisticsData({});
  }
}

const clearStatistics_history = () => {

  let choice = "Are you sure you want to clear your task history?"

  if (window.confirm(choice)) {
    setToDoListHistory([]);
  }
}



//console.log("TDL", toDoList);

  const filterTasks = (query) => {

    let filtered_list = toDoList;

    let filtered = filtered_list.map((task) => {

      //console.log("TTAGS", task.tags);

      let isValidated = false
      task.tags.map(
        tag => {
          if (tag.startsWith(query)) {
            isValidated = true;
          } else {

          }

        });

        if (isValidated == true) {
          return {...task, isSearched: true}
        } else {
          return {...task, isSearched: false}
        }
    });
    /*
    let filtered = filtered_list.map(task => {

        console.log("TTAGS", task.tags);
        task.tags.map(tag => tag.startsWith(query) == true;
        );

      });
    */
    
    console.log("FILTERED LIST", filtered)

    
    setToDoList(filtered);
  }

  const addPreset = (name) => {
    

    //console.log("TDL AP", toDoList)
    let tasksToCopy = toDoList;

    /*
    toDoList.forEach((task, index) => {
      tasksToCopy = [...tasksToCopy, { id: toDoList.length + index+1, task: task.task, time: task.time, tags: task.tags, complete: false, isSearched: false, subtasks: [], bg: task.bg }];
    });
    */

    
    let presetToCreate = [...presetData];
    presetToCreate = [...presetData, { preset_id: presetData.length + 1, name: name, tasks: toDoList}];

    

    //console.log("TASKS TO COPY", tasksToCopy);

    //console.log("PRESET TO CREATE", presetToCreate);
    
    setPresetData(presetToCreate);
    //setPresetData(copy);
 
  }

  const removePreset = (id) => {

    let presetsToRemove = presetData.filter(preset =>{
        return preset.preset_id != id;
    });

    setPresetData(presetsToRemove);

  }

  const editTask = () => {
    return (
      <></>
    )
  }

  // if a mobile device
  if(/Android|webOS|iPhone|iPod|iPad|Kindle|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
    <div className="app" style={{width: "95vw", margin: "0 auto"}} >
      
      <h1 className="text-center superbold mt-3" style={{color: "navy", fontFamily: "Montserrat", fontSize: "2.7rem"}}>To-do App</h1>
      <p className="text-center" style={{fontFamily: "Montserrat"}}></p>

      <Tabs defaultActiveKey="mobile_main" id="mobile_app" className="" fill>

      <Tab eventKey="mobile_main" title="Home 🏠">
      <ToDoInputMobile addTask={addTask} toDoList={toDoList} toDoListHistory={toDoListHistory}/>
     
      <hr></hr>
      
      <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask}/>
      <ClearTasksButton removeTasks={removeTasks} editTask={editTask}/>

      {/* <p className="my-2 ml-2" style={{textAlign: "right"}}>{currentDateTime}</p> */}
      </Tab>

      <Tab eventKey="mobile_advanced" title="Advanced ⚙️">

      <div className="">
      <TagFilterMobile filterTasks={filterTasks} />


      <div className="flex-grow-super">
      <ToDoPresetTitle></ToDoPresetTitle>
      <div className="d-flex" style={{justifyContent: "center", flexWrap: "wrap"}}>
      <ToDoPresetList addMultipleTasks={addMultipleTasks} presets={presetData} removePreset={removePreset}></ToDoPresetList>
      </div>
      <SaveToDoPreset addPreset={addPreset} removePreset={removePreset} />
      </div>

      </div>

      </Tab>

      <Tab eventKey="mobile_statistics" title="Statistics 📈">
      
      <ToDoStatistics data={statisticsData} clearStatistics={clearStatistics} clearStatistics_history={clearStatistics_history} taskLog={toDoListHistory}/>


      </Tab>
      </Tabs>
    </div>
  );

  //otherwise if desktop
  } else {
    return (
    
    <div className="app" style={{width: "70vw", margin: "0 auto"}}>

    <ToDoInput addTask={addTask}/>
    
    
    <Container>

    <Row>

    <Col lg="6" style={{margin: "0 auto", position: "relative"}}>
    <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask} />
    <ClearTasksButton removeTasks={removeTasks} editTask={editTask}/>
    </Col>

    <Col lg="6">
      <ToDoStatistics data={statisticsData} clearStatistics={clearStatistics} clearStatistics_history={clearStatistics_history} taskLog={toDoListHistory}/>
    </Col>

    </Row>
 
    </Container>  

    
    <Container>
    <Row>

    <hr className="mt-3"></hr>

    <Col lg="12">
       <h3 className='text-center mt-3 superbold underliner'>Advanced Features</h3>
    </Col>

    <Col lg="6" md="6">
      <TagFilter filterTasks={filterTasks}/>
    
    </Col>


    <Col lg="6" md="6">
      <ToDoPresetTitle></ToDoPresetTitle>
    
   

      <div className="text-center">
      <ToDoPresetList addMultipleTasks={addMultipleTasks} presets={presetData} removePreset={removePreset}></ToDoPresetList>
      </div>
      <SaveToDoPreset addPreset={addPreset} removePreset={removePreset}/>

    </Col>
    </Row>
    
    </Container>

    <p className="mt-5" style={{textAlign: "right"}}>{currentDateTime}</p>
    </div>
    )
  }
}

export default App;
