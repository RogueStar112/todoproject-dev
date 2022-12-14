import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SaveToDoPreset from './SaveToDoPreset.js';

const ToDoPreset = ({presets, addMultipleTasks, removePreset}) => {

    const [isHovering, setIsHovering] = useState(false); 
    
    const handleMouseOver = () => {
        setIsHovering(true);

    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const revealTasks = () => {
        return (
            <></>
        )
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
        <tr>
        <td>
            {presets.name}
        </td>

        <td className="d-flex" style={{justifyContent: "center"}}>
            <Button className="mx-1" variant="success" aria-label="add-preset-btn" onClick={handleAddMultipleTasks}>➕</Button>
            <Button className="mx-1" variant="danger" aria-label="delete-preset-btn" onClick={removePreset}>🗑️</Button>
        </td>
        </tr>
    )

}

export default ToDoPreset;