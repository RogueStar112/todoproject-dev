import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SaveToDoPreset from './SaveToDoPreset.js';

const ToDoPreset = ({presets, addMultipleTasks}) => {

    const [isHovering, setIsHovering] = useState(false); 
    
    const handleMouseOver = () => {
        setIsHovering(true);

    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const handleAddMultipleTasks = () => {
        let tasksToDisplay = "You will add the following tasks\n\n"
        
        let presetTaskTime_toLocaleString = null;
        presets.tasks.forEach(preset_task => {
            
            let presetTaskTime = new Date(`${preset_task.time}`)
            presetTaskTime = presetTaskTime.toLocaleString()

            tasksToDisplay = tasksToDisplay + `${preset_task.task} ${presetTaskTime}\n`
        })

        tasksToDisplay += `\nAre you sure about this?`

        if (window.confirm(tasksToDisplay) == true) {
            addMultipleTasks(presets.tasks)
        } else {
            alert('Preset task adding cancelled');
        }
    }
 
    return (
        <>
        <Badge bg="danger" className="mx-3" style={{cursor: "pointer", margin: "0 auto", padding: "20px"}} onClick={handleAddMultipleTasks}>
            {presets.name}
        </Badge>
        </>
    )

}

export default ToDoPreset;