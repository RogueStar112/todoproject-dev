import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoInput from './components/todoinput/ToDoInput.js';
import ToDoOutput from './components/todooutput/ToDoOutput.js';
import data from "./data.json";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClearTasksButton from './components/todoinput/ClearTasksButton';




function App() {

const date = new Date();


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


const [ toDoList, setToDoList ] = useState(data);



// thanks to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:619-796
const addTask = (userInput_task, userInput_tags, userInput_bg, userInput_date) => {

  





  // removes spaces and uses commas to separate tags!
  userInput_tags = userInput_tags.replace(/\s/g, '')
  userInput_tags = userInput_tags.split(',')


  console.log(userInput_tags)

  let copy = [...toDoList];
  copy = [...copy, { id: toDoList.length + 1, task: userInput_task, time: userInput_date, tags: userInput_tags, complete: false, subtasks: [], bg: userInput_bg }];
  setToDoList(copy);

}


  return (
    <div className="app" style={{width: "60vw", margin: "0 auto"}}>
      <ToDoInput addTask={addTask}/>
      <ToDoOutput toDoList={toDoList} counter={counter} />
      <ClearTasksButton />
      <p className="mt-5" style={{textAlign: "right"}}>{currentDateTime}</p>
    </div>
  );
}

export default App;
