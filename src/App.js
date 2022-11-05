import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoInput from './components/todoinput/ToDoInput.js';
import ToDoInputMobile from './components/todoinput/ToDoInputMobile';
import ToDoOutput from './components/todooutput/ToDoOutput.js';
import data from "./data.json";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClearTasksButton from './components/todoinput/ClearTasksButton';

import TagFilter from './components/todoinput/TagFilter.js';


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


//localStorage.clear();

// thanks to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:619-796
const addTask = (userInput_task, userInput_tags, userInput_bg, userInput_date) => {

  

  if (userInput_tags == null) {
    userInput_tags = ['misc'];
  }

  /*
  if (userInput_date == null) {
    userInput_date = new Date(); 
  }
  */



  // removes spaces and uses commas to separate tags!
  userInput_tags = userInput_tags.replace(/\s/g, '')
  userInput_tags = userInput_tags.toLowerCase();
  userInput_tags = userInput_tags.split(',')


  console.log(userInput_tags)

  let copy = [...toDoList];
  copy = [...copy, { id: toDoList.length + 1, task: userInput_task, time: userInput_date, tags: userInput_tags, complete: false, subtasks: [], bg: userInput_bg }];
  setToDoList(copy);
  
  //localStorage.setItem('data', JSON.stringify(toDoList));

}

 const toggleTask = (id) => {

  console.log('ID', id)
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

  // if a mobile device
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
    <div className="app" style={{width: "95vw", margin: "0 auto"}}>
      <ToDoInputMobile addTask={addTask}/>
      <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask}/>
      <ClearTasksButton removeTasks={removeTasks}/>
      <TagFilter />
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
    <TagFilter />
    <p className="mt-5" style={{textAlign: "right"}}>{currentDateTime}</p>
    </div>
    )
  }
}

export default App;
