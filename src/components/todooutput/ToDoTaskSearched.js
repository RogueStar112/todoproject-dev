import React, { useState, useEffect } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import * as icon from 'react-bootstrap-icons';
import { getTime } from 'date-fns';

const ToDoTaskSearched = ({todo, counter, addTask}) => {

    const [isFinished, setIsFinished] = useState(todo.complete);

    const [isDueNow, setisDueNow] = useState(false);

    useEffect(() => {
        checkIfDue()
    }, [counter]);

    const checkIfDue = () => {
        
        var currentDateTime = new Date();
        var dueTimeInSeconds = currentDateTime.getTime() / 1000;

        
        if (dateValue/1000 < dueTimeInSeconds) {
            setisDueNow(true);
            todo.onTime = false;
        }


    }

    const taskAlert = () => {
        
        //credit to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:310-468

        setIsFinished(!todo.complete);

    }
    

    const dateValue = new Date(`${todo.time}`);
    let dateDisplay = dateValue.toLocaleString();

    if (dateDisplay == "Invalid Date") {
        dateDisplay = "No date specified...";
    }

    return (
        <tr style={{cursor: "pointer", maxHeight: "64px"}} key={todo.id+todo.task} className={isFinished ? "" : ""}>
            <td style={{backgroundColor: `${todo.bg}`}}>{todo.id}</td>
            <td className="d-flex" style={{position: "relative", justifyContent: "space-between", width: "100%", maxHeight: "150%"}}>
                <div className="" style={{textAlign: "justify"}}>{todo.task}<br />{todo.tags.map(todo_tag => {
                {return (<Badge className={todo.isSearched ? "bg-success mx-1" : "mx-1"} bg="primary">{todo_tag}</Badge>);}
            })}</div><div style={{color: "red", wordWrap: "normal", display: "inline-block", lineHeight: "48px", }}><Button variant="success" onClick={() => addTask(todo.task, todo.tags, todo.bg, dateValue)}>+ ADD TASK</Button></div></td>
            <td className="d-none actions-column">

            </td>
            <td className="d-none tag-column" style={{listStyle: "none"}}>{todo.tags.map(todo_tag => {
                {return (<Badge className={todo.isSearched ? "bg-success mx-1" : "mx-1"} bg="primary">{todo_tag}</Badge>);}
            })}</td>
            <td className="d-none due-column">{isDueNow ? "NOW" : dateDisplay.slice(0, -3)}</td>
        </tr>
    );
}

export default ToDoTaskSearched;