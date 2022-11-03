import React, { useState } from 'react';
import './App.css';
import ToDoInput from './components/todoinput/ToDoInput.js';
import ToDoOutput from './components/todooutput/ToDoOutput.js';
import data from "./data.json";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClearTasksButton from './components/todoinput/ClearTasksButton';




function App() {

const [ toDoList, setToDoList ] = useState(data);



// thanks to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:619-796
const addTask = (userInput_task, userInput_tags, userInput_bg) => {


  userInput_tags = userInput_tags.replace(/\s/g, '')
  


  userInput_tags = userInput_tags.split(',')


  console.log(userInput_tags)

  let copy = [...toDoList];
  copy = [...copy, { id: toDoList.length + 1, task: userInput_task, tags: userInput_tags, complete: false, subtasks: [], bg: userInput_bg }];
  setToDoList(copy);

}


  return (
    <div className="app" style={{width: "60vw", margin: "0 auto"}}>
      <ToDoInput addTask={addTask}/>
      <ToDoOutput toDoList={toDoList} />
      <ClearTasksButton />
    </div>
  );
}

export default App;
