import React, { useState, useEffect } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import * as icon from 'react-bootstrap-icons';
import { getTime } from 'date-fns';

const ToDoTask = ({todo, counter}) => {

    const [isFinished, setIsFinished] = useState(false);

    const [isDueNow, setisDueNow] = useState(false);

    useEffect(() => {
        checkIfDue()
    }, [counter]);

    const checkIfDue = () => {
        
        var currentDateTime = new Date();
        var dueTimeInSeconds = currentDateTime.getTime() / 1000;

        
        if (dateValue/1000 < dueTimeInSeconds) {
            setisDueNow(true);
        }


    }

    const taskAlert = () => {
        
        setIsFinished(!isFinished);

    }
    

    const dateValue = new Date(`${todo.time}`);
    const dateDisplay = dateValue.toLocaleString();

    return (
        <tr key={todo.id+todo.task} onClick={() => taskAlert()} className={isFinished ? "text-decoration-line-through bg-info" : ""}>
            <td style={{backgroundColor: `${todo.bg}`}}>{todo.id}</td>
            <td>{todo.task}</td>
            <td style={{listStyle: "none"}}>{todo.tags.map(todo_tag => {
                {return (<Badge className="mx-1" bg="primary">{todo_tag}</Badge>);}
            })}</td>
            <td>{isDueNow ? "NOW" : dateDisplay}</td>
        </tr>
    );
}

export default ToDoTask;