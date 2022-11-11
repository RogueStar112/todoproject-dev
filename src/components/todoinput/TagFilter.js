import React, { useState } from 'react';
import CustomFlexContainer from "./CustomFlexContainer";
import ToDoInputField from "./ToDoInputField";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TagFilter = ({filterTasks}) => {

    const [userInput_search, setUserInput_search] = useState("");

    const handleChange_search = (e) => {
        setUserInput_search(e.currentTarget.value);
    }


    return (
      <div style={{position: "relative", height: "100%"}}>
      <h4 className="text-center mt-3">Filter tags</h4>
      <p className="text-center">Highlight tasks with a particular tag!</p>
      <Form className="mt-5" style={{margin: "0 auto"}}>
        <InputGroup style={{position: "absolute", bottom: "17px"}}>
        <ToDoInputField value={userInput_search} width_val={"70%"} onChange={handleChange_search} label="filter by tag"></ToDoInputField>

        <Button onClick={() => filterTasks(userInput_search)} style={{width: "30%"}}>🔍</Button>
        </InputGroup>
      </Form>
      </div>
    )
}

export default TagFilter;
