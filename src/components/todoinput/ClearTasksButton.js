import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const CompleteTasks = () => {
    const completeTasks = document.querySelectorAll('.text-decoration-line-through');

    console.log(completeTasks);
    console.log('test');

    completeTasks.forEach(completeTask => {
        completeTask.remove();
    })

}

const ClearTasksButton = () => {


    return (
    <Container className="mt-3">
        <Button variant="success" onClick={() => CompleteTasks()} style={{width: "100%"}}>Clear Tasks</Button>
    </Container>
    )
} 

export default ClearTasksButton;