import React, { useState } from 'react';

import ToDoPreset from './ToDoPreset';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table';

import presets from "../../presets.json";

const ToDoPresetList = ({addMultipleTasks, presets, removePreset}) => {
    
    return (
        <Table style={{textAlign: "center"}}>
            <thead>
            <tr>
            <th style={{width: "40%"}}>Name</th>
            <th>Actions</th>
            </tr>
            </thead>
        <tbody>
        {

        presets.map((preset) => {
                
                return (
                    <ToDoPreset addMultipleTasks={addMultipleTasks} presets={preset} removePreset={() => (removePreset(preset.preset_id))}/>
                )
        })
        }
        </tbody>
        </Table>
    )

}

export default ToDoPresetList;

