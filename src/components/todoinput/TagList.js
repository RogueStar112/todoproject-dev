import React, { useState, useEffect } from 'react';



import Badge from 'react-bootstrap/Badge';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ToDoTaskSearched from '../todooutput/ToDoTaskSearched';

import { useLocalStorage } from '../../useLocalStorage';


import Tag from './Tag';

const TagList = ({toDoList, toDoListHistory, filterResults}) => {

    
    const [toDoListTags, setToDoListTags] = useLocalStorage('toDoListTags', [])

    let uniqueToDoListTags = []


    useEffect(() => {  
    

    toDoListHistory.forEach(task_history => {
        task_history.data.forEach(task => {
        task.tags.forEach(tag => {
            uniqueToDoListTags = [...uniqueToDoListTags, tag]
            })
        })
    })

    uniqueToDoListTags = [...new Set(uniqueToDoListTags)]

    uniqueToDoListTags = uniqueToDoListTags.sort();

    setToDoListTags(uniqueToDoListTags);

    }, [toDoList])
    

    const filterTasksByTag = (tag) => {
        
        let tasksFiltered = [];

        toDoListHistory.forEach(task_history => {
            task_history.data.filter(task => {
                if (task.tags.includes(tag) === true) {
                    tasksFiltered = [...tasksFiltered, task]
                }
                //return task.tags.includes(tag);
            })
        })

        console.log(tasksFiltered)

        return (
            tasksFiltered.map(task => {
                
                return (
                    <h1>Test</h1>
                )

            })
        )


    }

    return (
        toDoListTags.map((tag) => {
            return (
                <Badge variant="primary" className="m-2 p-2" style={{cursor: "pointer"}} onClick={() => filterResults(tag)}>{tag}</Badge>
            )
        })
    )

}

export default TagList;