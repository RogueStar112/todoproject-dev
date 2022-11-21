import React, { useState, useEffect } from 'react';



import Badge from 'react-bootstrap/Badge';


import { useLocalStorage } from '../../useLocalStorage';


import Tag from './Tag';

const TagList = ({toDoList}) => {

    
    const [toDoListTags, setToDoListTags] = useLocalStorage('toDoListTags', [])

    let uniqueToDoListTags = []
    useEffect(() => {  
    

    toDoList.forEach(task => {
        task.tags.forEach(tag => {
            uniqueToDoListTags = [...uniqueToDoListTags, tag]
        })
    })

    uniqueToDoListTags = [...new Set(uniqueToDoListTags)]

    uniqueToDoListTags = uniqueToDoListTags.sort();

    setToDoListTags(uniqueToDoListTags);

    }, [toDoList])
    
    return (
        toDoListTags.map((task) => {
        return (
            <Badge variant="primary" className="m-2 p-2">{task}</Badge>
        )
        })
    )

}

export default TagList;