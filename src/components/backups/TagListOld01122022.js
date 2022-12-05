import React, { useState, useEffect } from 'react';



import Badge from 'react-bootstrap/Badge';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useLocalStorage } from '../../useLocalStorage';


import Tag from './Tag';

let tasksFiltered = []

const TagList = ({toDoList, toDoListHistory}) => {

    
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
    

    // Makes a unique array
    
    uniqueToDoListTags = [...new Set(uniqueToDoListTags)]
    
    // Sorts that unique array

    uniqueToDoListTags = uniqueToDoListTags.sort();

    setToDoListTags(uniqueToDoListTags);

    toDoListTags.forEach(tag => {
        toDoListHistory.forEach(task_history => {
            task_history.data.filter(task => {
                if (task.tags.includes(tag) === true) {
                    tasksFiltered = [...tasksFiltered, task]
                }
                //return task.tags.includes(tag);
            })
        })
    });
    
    console.log('TASKS FILTERED', tasksFiltered)


    }, [toDoListHistory])
    

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
        <Tabs defaultActiveKey="existingTasks_main" id="existingTasks_main" className="" fill>
        {
            toDoListTags.map((tag) => {
            return (
                <Tab eventKey={tag} title={tag} onClick={((tag) => filterTasksByTag(tag))}>
                    {
                        tasksFiltered.map(task_details => {
                            task_details.tags.map(tag => {
                            return (
                                <h1>Test</h1>
                            )
                        })
                        })
                    }
                </Tab>
            )
            })
        }
        </Tabs>
    )

}

export default TagList;