import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import InputGroup from 'react-bootstrap/InputGroup';



const ClearTasksButton = ({removeTasks}) => {


    return (

        <InputGroup>
        <Button variant="success" onClick={() => removeTasks(true)} style={{width: "70%"}}>Publish Marked Tasks</Button>
        <Button variant="danger" onClick={() => removeTasks(false)} style={{width: "30%"}}>Discard Marked Tasks</Button>
        </InputGroup>

    )
} 

export default ClearTasksButton;