import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SaveToDoPreset from './SaveToDoPreset.js';

const ToDoPreset = ({presets}) => {

    const [isHovering, setIsHovering] = useState(false); 
    
    const handleMouseOver = () => {
        setIsHovering(true);

    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }
 
    return (
        <>
        <Badge bg="danger" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="mt-1" style={{cursor: "pointer", margin: "0 auto", padding: "20px"}} onClick={() => console.log('')}>
            {presets.name}
        </Badge>

        {isHovering ? presets.tasks.map(preset_task => {
            return (
                <p style={{color: `${preset_task.bg}`}}>{preset_task.task} {preset_task.time}</p>

            );
        }) : <></> }
        </>
    )

}

export default ToDoPreset;