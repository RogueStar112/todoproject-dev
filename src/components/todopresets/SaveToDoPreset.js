import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
/*


SaveToDoPreset algorithm

1. Get a copy of ToDoList as a prop
2. 


*/

const SaveToDoPreset = ({addPreset, removePreset}) => {

    const [presetInput, setPresetInput] = useState("");
    

    const handleChange = (e) => {
        setPresetInput(e.currentTarget.value);
    }

    const handleSubmit_save = (e) => {
        e.preventDefault();
        
        if (presetInput == "") {
            alert('You must give your preset a name')
        } else {

        addPreset(presetInput)
        setPresetInput("");

        }
    }

    const handleSubmit_delete = (e) => {
        e.preventDefault();
        
        if (presetInput == "") {
            alert('You must give a preset name to delete')
        } else {
            
            removePreset(presetInput)
            setPresetInput("");

        }
    
    }
    
    return (
        <div className="text-center mt-3">
        <Form>
        <InputGroup>
        <Form.Label size="sm" className="mt-3" style={{position: "absolute", bottom:"30px", display: "", fontSize: "10px"}}>Preset name</Form.Label>

        <Form.Control value={presetInput} onChange={handleChange} className="" style={{width: "70%", margin: "0 auto"}} autoComplete="off" placeholder="test"></Form.Control>
            <Button aria-label="save-preset-btn" style={{width: "15%"}} onClick={handleSubmit_save}>💾</Button>
            <Button aria-label="delete-preset-btn" style={{width: "15%"}} variant="danger" onClick={handleSubmit_delete}>🗑️</Button>
        </InputGroup>
        </Form>
        </div>
        
    )
}

export default SaveToDoPreset;