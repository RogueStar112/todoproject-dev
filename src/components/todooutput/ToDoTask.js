import React, { useState, useEffect } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import * as icon from "react-bootstrap-icons";
import { getTime } from "date-fns";

const ToDoTask = ({ todo, counter, toDoList, toggleTask }) => {
  const [isFinished, setIsFinished] = useState(todo.complete);

  const [isDueNow, setisDueNow] = useState(false);

  useEffect(() => {
    checkIfDue();
  }, [counter]);

  const checkIfDue = () => {
    var currentDateTime = new Date();
    var dueTimeInSeconds = currentDateTime.getTime() / 1000;

    if (dateValue / 1000 < dueTimeInSeconds) {
      setisDueNow(true);
    }
  };

  const taskAlert = () => {
    //credit to: https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:310-468

    setIsFinished(!todo.complete);
  };

  const dateValue = new Date(`${todo.time}`);
  let dateDisplay = dateValue.toLocaleString();

  if (dateDisplay == "Invalid Date") {
    dateDisplay = "No date specified...";
  }

  return (
    <tr
      style={{ cursor: "pointer" }}
      key={todo.id + todo.task}
      onClick={() => {
        toggleTask(todo.id);
        taskAlert();
      }}
      className={isFinished ? "text-decoration-line-through bg-info" : ""}
    >
      <td style={{ backgroundColor: `${todo.bg}` }}>{todo.id}</td>
      <td>{todo.task}</td>
      <td style={{ listStyle: "none" }}>
        {todo.tags.map((todo_tag) => {
          {
            return (
              <Badge
                className={todo.isSearched ? "bg-success mx-1" : "mx-1"}
                bg="primary"
              >
                {todo_tag}
              </Badge>
            );
          }
        })}
      </td>
      <td>{isDueNow ? "NOW" : dateDisplay.slice(0, -3)}</td>
    </tr>
  );
};

export default ToDoTask;
