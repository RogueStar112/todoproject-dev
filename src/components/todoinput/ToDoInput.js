import React, { useState } from 'react';
import CustomFlexContainer from "./CustomFlexContainer";
import ToDoInputField from "./ToDoInputField";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ToDoInput( {addTask} ) {

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
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (userInput == "") {
      alert('You must include a task name');
    } else {


      /*const userInput_date_display = Date.parse(userInput_date).toLocaleString(); */

      addTask(userInput, userInput_tags, userInput_color, userInput_date);

      setUserInput("");
      setUserInput_tags("");
      setUserInput_color("#DDDDDD");
    }


  }

  return (
    <>
    <h1 className="text-center mt-3 superbold underliner">Todo App</h1>

    <h3 className="text-center superbold">Task creation</h3>
    <Form>
    <Container className="mt-3">
    <Row>
      <Col>
        <InputGroup>
        <ToDoInputField value={userInput} width_val={"80%"} onChange={handleChange} label="Name of task*" type="text" name="todo-name" placeholder="Clean room desk"></ToDoInputField>
        <Button onClick={handleSubmit} className="" style={{width: "20%"}} variant="primary" type="submit">
         Submit
        </Button>
        </InputGroup>
      </Col>
    </Row>
    </Container>

    <Container className="mt-3">
        
        <Row>

        
        <Col><ToDoInputField value={userInput_tags} width_val={"100%"} onChange={handleChange_tags} label="tags (separate with commas)" type="text" name="todo-tags" placeholder="chores, cleaning"></ToDoInputField></Col>
        <Col><ToDoInputField value={userInput_date} width_val={"100%"} onChange={handleChange_date} label="date and time reminder" type="datetime-local" name="todo-time" hasSubmitField="true"></ToDoInputField></Col>
        <Col><ToDoInputField value={userInput_color} width_val={"100%"} onChange={handleChange_color} label="task color" type="color" name="todo-color"></ToDoInputField></Col>
        </Row>
    </Container>
    </Form>

    </>
  );
}

export default ToDoInput;
