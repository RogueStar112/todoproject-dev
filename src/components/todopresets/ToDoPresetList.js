import React, { useState } from 'react';

import ToDoPreset from './ToDoPreset';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import presets from "../../presets.json";

const ToDoPresetList = ({addMultipleTasks, presets}) => {

    return (
        presets.map((preset) => {
                
                return (
                    <ToDoPreset addMultipleTasks={addMultipleTasks} presets={preset} />
                )
        })
        
    )

}

export default ToDoPresetList;

