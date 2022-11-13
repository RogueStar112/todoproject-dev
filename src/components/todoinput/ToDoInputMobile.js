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


    if (userInput == "") {
      alert('You must include a task name');
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

    <Form>
    <Container className="mt-3">

        <ToDoInputField value={userInput} onChange={handleChange} label="Name of task*" type="text" name="todo-name" placeholder="Clean room desk"></ToDoInputField>

    </Container>

    <p className='text-center mt-3' style={{fontSize: "10px"}}>------- The last three fields are optional. -------</p>

    <Container className="mt-3 mobileInputContainer_threeFields">

        
        <ToDoInputField style={{marginTop: "20px"}} value={userInput_tags} onChange={handleChange_tags} label="tags (separate with commas)" type="text" name="todo-tags" placeholder="chores, cleaning"></ToDoInputField>
        <ToDoInputField style={{marginTop: "20px"}} value={userInput_date} onChange={handleChange_date} label="tag date and time" type="datetime-local" name="todo-time" hasSubmitField="true"></ToDoInputField>
        <ToDoInputField style={{marginTop: "20px"}} value={userInput_color} onChange={handleChange_color} label="tag color" type="color" name="todo-color"></ToDoInputField>

        <Button onClick={handleSubmit} style={{marginTop: "20px"}} className="my-2" style={{width: "100%"}} variant="primary" type="submit">
         Submit
        </Button>

    </Container>
    </Form>
    </>
  );
}

export default ToDoInputMobile;
