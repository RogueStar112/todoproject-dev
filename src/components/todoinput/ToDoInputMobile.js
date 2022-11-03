import React, { useState } from 'react';
import CustomFlexContainer from "./CustomFlexContainer";
import ToDoInputField from "./ToDoInputField";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ToDoInputMobile( {addTask} ) {

  const [userInput, setUserInput] = useState("");
  const [userInput_tags, setUserInput_tags] = useState("");
  const [userInput_color, setUserInput_color] = useState("#DDDDDD");
  const [userInput_date, setUserInput_date] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  }

  const handleChange_tags = (e) => {
    setUserInput_tags(e.currentTarget.value);
  }

  const handleChange_color = (e) => {
    setUserInput_color(e.currentTarget.value);
  }

  const handleChange_date = (e) => {
    setUserInput_date(e.currentTarget.value);
    console.log("TLS +", userInput_date.toString());
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (userInput == "" || userInput_tags == "") {
      alert('You must include a task name and tag');
    } else {
      const userInput_date_display = userInput_date.toLocaleString();
      addTask(userInput, userInput_tags, userInput_color, userInput_date_display);

      setUserInput("");
      setUserInput_tags("");
      setUserInput_color("#DDDDDD");
    }


  }

  return (
    <>
    <h1 className="text-center mt-3">Todo App</h1>

    <Form>
    <Container className="mt-3">

        <ToDoInputField value={userInput} onChange={handleChange} label="Name of task*" type="text" name="todo-name" placeholder="Clean room desk"></ToDoInputField>

    </Container>

    <Container className="mt-3">

        
        <ToDoInputField value={userInput_tags} onChange={handleChange_tags} label="tags (separate with commas)*" type="text" name="todo-tags" placeholder="chores, cleaning"></ToDoInputField>
        <ToDoInputField value={userInput_date} onChange={handleChange_date} label="tag date and time*" type="datetime-local" name="todo-time" hasSubmitField="true"></ToDoInputField>
        <ToDoInputField value={userInput_color} onChange={handleChange_color} label="tag color" type="color" name="todo-color"></ToDoInputField>

        <Button onClick={handleSubmit} className="mx-2" style={{width: "100%"}} variant="primary" type="submit">
         Submit
        </Button>

    </Container>
    </Form>
    </>
  );
}

export default ToDoInputMobile;
