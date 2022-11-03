import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import * as icon from 'react-bootstrap-icons';

const ToDoTask = ({todo}) => {

    const [isFinished, setIsFinished] = useState(false);


    const taskAlert = () => {
        
        setIsFinished(!isFinished);

    }

    return (
        <tr key={todo.id+todo.task} onClick={() => taskAlert()} className={isFinished ? "text-decoration-line-through" : ""}>
            <td style={{backgroundColor: `${todo.bg}`}}>{todo.id}</td>
            <td>{todo.task}</td>
            <td style={{listStyle: "none"}}>{todo.tags.map(todo_tag => {
                {return (<Badge className="mx-1" bg="primary">{todo_tag}</Badge>);}
            })}</td>
        </tr>
    );
}

export default ToDoTask;