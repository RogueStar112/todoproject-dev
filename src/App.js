import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoInput from './components/todoinput/ToDoInput.js';
import ToDoInputMobile from './components/todoinput/ToDoInputMobile';
import ToDoOutput from './components/todooutput/ToDoOutput.js';

import data from "./data.json";
import presets from "./presets.json";

import ToDoPreset from './components/todopresets/ToDoPreset';
import ToDoPresetTitle from './components/todopresets/ToDoPresetTitle';
import ToDoPresetList from './components/todopresets/ToDoPresetList';
import SaveToDoPreset from './components/todopresets/SaveToDoPreset';

import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClearTasksButton from './components/todoinput/ClearTasksButton';

import TagFilter from './components/todoinput/TagFilter.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useLocalStorage } from './useLocalStorage';

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


const [ toDoList, setToDoList ] = useLocalStorage(data, []);

const [ presetData, setPresetData ] = useState(presets, []);
    

//localStorage.clear();

// thanks to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:619-796

const addMultipleTasks = (tasks) => {

  let copy = [...toDoList];

  tasks.forEach((task, index) => {
    copy = [...copy, { id: toDoList.length + index+1, task: task.task, time: task.time, tags: task.tags, complete: false, isSearched: false, subtasks: [], bg: task.bg }];
  });

  setToDoList(copy);
 
}

const addTask = (userInput_task, userInput_tags, userInput_bg, userInput_date) => {

  //console.log('FUNCTION CALL')

  if (userInput_tags == null) {
    userInput_tags = ['misc'];
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
  copy = [...copy, { id: toDoList.length + 1, task: userInput_task, time: userInput_date, tags: userInput_tags, complete: false, isSearched: false, subtasks: [], bg: userInput_bg }];
  setToDoList(copy);
  
  //console.log("STDL", toDoList);
  
  //localStorage.setItem('data', JSON.stringify(toDoList));

}

 const toggleTask = (id) => {

  let mapped = toDoList.map(task => {
    return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
  });

   setToDoList(mapped)
 }

 const removeTasks = () => {

  let filtered = toDoList.filter(task => {
      return !task.complete; 
  });

  setToDoList(filtered);

  
}

//console.log("TDL", toDoList);

  const filterTasks = (query) => {

    let filtered_list = toDoList;

    let filtered = filtered_list.map((task) => {

      console.log("TTAGS", task.tags);

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
    

    console.log("TDL AP", toDoList)
    let tasksToCopy = toDoList;

    /*
    toDoList.forEach((task, index) => {
      tasksToCopy = [...tasksToCopy, { id: toDoList.length + index+1, task: task.task, time: task.time, tags: task.tags, complete: false, isSearched: false, subtasks: [], bg: task.bg }];
    });
    */

    
    let presetToCreate = [...presetData];
    presetToCreate = [...presetData, { preset_id: presetData.length + 1, name: name, tasks: toDoList}];

    

    console.log("TASKS TO COPY", tasksToCopy);
    console.log("PRESET TO CREATE", presetToCreate);
    
    setToDoList([]);
    //setPresetData(copy);
 
  }

  const removePreset = (name) => {
    return (
      <></>
    )
  }

  // if a mobile device
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
    <div className="app" style={{width: "95vw", margin: "0 auto"}}>
      <ToDoInputMobile addTask={addTask}/>
      <TagFilter filterTasks={filterTasks}/>
      <hr></hr>
      
      <ToDoPresetTitle></ToDoPresetTitle>
      <ToDoPresetList  addMultipleTasks={addMultipleTasks} presets={presetData}></ToDoPresetList>
      <SaveToDoPreset />

      <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask}/>
      <ClearTasksButton removeTasks={removeTasks}/>
      <p className="my-2 ml-2" style={{textAlign: "right"}}>{currentDateTime}</p>
    </div>
  );

  //otherwise if desktop
  } else {
    return (
    
    <div className="app" style={{width: "70vw", margin: "0 auto"}}>

    <ToDoInput addTask={addTask}/>
    
    <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask} />
    <ClearTasksButton removeTasks={removeTasks}/>
    
    <hr className="mt-5"></hr>
    <Container>
    <Row>

    <Col lg="6">
      <TagFilter filterTasks={filterTasks}/>
    
    </Col>


    <Col lg="6">
      <ToDoPresetTitle></ToDoPresetTitle>
    
   

      <div className="text-center">
      <ToDoPresetList addMultipleTasks={addMultipleTasks} presets={presetData}></ToDoPresetList>
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
