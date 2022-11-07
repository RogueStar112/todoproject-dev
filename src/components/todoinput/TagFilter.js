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
      <>
      <Form className="mt-5" style={{margin: "0 auto"}}>
        <InputGroup>
        <ToDoInputField value={userInput_search} width_val={"86%"} onChange={handleChange_search} label="filter by tag"></ToDoInputField>
        <Button onClick={() => filterTasks(userInput_search)} style={{width: "100% !important"}}>Search by tag</Button>
        </InputGroup>
      </Form>
      </>
    )
}

export default TagFilter;
