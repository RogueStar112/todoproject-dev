import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';



const ClearTasksButton = ({removeTasks}) => {


    return (
        <div>
        <Button variant="success" onClick={() => removeTasks()} style={{width: "100%"}}>Clear Tasks</Button>
        </div>
    )
} 

export default ClearTasksButton;