import React, { useState } from 'react';

import ToDoPreset from './ToDoPreset';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import presets from "../../presets.json";

const ToDoPresetList = () => {

    const [presetData, setPresetData] = useState(presets);
    
    return (
        presetData.map((preset, index) => {
        
                if (index === 0) {
                return (
                    <div className="text-center">
                    <h1>Presets</h1>
                    <p>Add commonly used preset tasks!</p>
                    <ToDoPreset presets={preset} />
                    </div>
                )
            } else {
                 
                return (
                    <ToDoPreset presets={preset} />
                )
            }
        })
        
    )

}

export default ToDoPresetList;

