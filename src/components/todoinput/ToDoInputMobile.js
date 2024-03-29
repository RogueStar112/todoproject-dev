import React, { useState } from 'react';
import CustomFlexContainer from "./CustomFlexContainer";
import ToDoInputField from "./ToDoInputField";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TagList from './TagList';

import Table from 'react-bootstrap/Table';

import ToDoTaskSearched from '../todooutput/ToDoTaskSearched';

import { useLocalStorage } from '../../useLocalStorage';
import tag_history from '../../history_tags.json';

function ToDoInputMobile( {addTask, toDoList, toDoListHistory} ) {

  const [userInput, setUserInput] = useState("");
  const [userInput_tags, setUserInput_tags] = useState("");
  const [userInput_color, setUserInput_color] = useState("#DDDDDD");
  const [userInput_date, setUserInput_date] = useState("");


  let [filteredResults, setFilteredResults] = useLocalStorage('filtered_results', tag_history || []);

  const filterResults = (name) => {
    
    /*let mapped = toDoList.map(task => {
      return task.tags.includes(name) === true ? { ...task, isSearchedByTag: !task.isSearchedByTag } : { ...task};
    });*/

    let filtered_list = toDoListHistory;

    console.log('FLIST', filtered_list);
    
    let filtered_array = [];

    let filtered = filtered_list.map((task) => {

      //console.log("TTAGS", task.tags);

      task.data.map(data => {
        let isValidated = false
        data.tags.map(
          tag => {
            if (tag.startsWith(name)) {
              isValidated = true;
            } else {

            }

          });

          if (isValidated == true) {
            //console.log('DATA T', data);
            filtered_array.push({...data, isSearchedByTag: true})

            //console.log('T FILTERED ARRAY' , filtered_array);
            return {...data, isSearchedByTag: true}
            
          } else {
            //console.log('DATA F', data);

            //filtered_array.push({...data, isSearchedByTag: false})
            
            //console.log('F FILTERED ARRAY' , filtered_array);
            return {...data, isSearchedByTag: false}
          }
        })
    });
    /*
    let filtered = filtered_list.map(task => {

        console.log("TTAGS", task.tags);
        task.tags.map(tag => tag.startsWith(query) == true;
        );

      });
    */
    
    //console.log("FILTERED LIST", filtered)

    setFilteredResults(filtered_array);

    
    //setFilteredResults(filtered);
  
    //setFilteredResults(mapped)

    //console.log('FILTERED RESULTS', filteredResults)

  }


  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  }

  const handleChange_tags = (e) => {
    setUserInput_tags(e.currentTarget.value);
  }

  const handleChange_color = (e) => {
    setUserInput_color(e.currentTarget.value);
  }

  const handleChange_date = (e) => {
    setUserInput_date(e.currentTarget.value);
    console.log("TLS +", userInput_date.toString());
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (userInput == "") {
      alert('You must include a task name');
    } else {
      const userInput_date_display = userInput_date.toLocaleString();
      addTask(userInput, userInput_tags, userInput_color, userInput_date_display);

      setUserInput("");
      setUserInput_tags("");
      setUserInput_color("#DDDDDD");
    }


  }

  return (
    <>

    <h3 className="text-center mt-3 superbold">Task creation</h3>

    <Tabs defaultActiveKey="task_creation_main" id="task_creation_main" className="" fill>

    <Tab eventKey="task_creation_main" title="Create new task">
      <Form>
        <Container className="mt-3">

            <ToDoInputField value={userInput} onChange={handleChange} label="Name of task*" type="text" name="todo-name" placeholder="Clean room desk"></ToDoInputField>

        </Container>

        <p className='text-center mt-3' style={{fontSize: "10px"}}>------- The following fields are optional. -------</p>

        <Container className="mt-3 mobileInputContainer_threeFields">

            
            <ToDoInputField style={{marginTop: "20px"}} value={userInput_tags} onChange={handleChange_tags} label="tags (separate with commas)" type="text" name="todo-tags" placeholder="chores, cleaning"></ToDoInputField>
            <ToDoInputField style={{marginTop: "20px"}} value={userInput_date} onChange={handleChange_date} label="tag date and time" type="datetime-local" name="todo-time" hasSubmitField="true"></ToDoInputField>
            <ToDoInputField style={{marginTop: "20px"}} value={userInput_color} onChange={handleChange_color} label="tag color" type="color" name="todo-color"></ToDoInputField>

            <Button onClick={handleSubmit} style={{width: "100%"}} className="my-3" variant="primary" type="submit">
            Submit
            </Button>

        </Container>
      </Form>
    </Tab>

    <Tab eventKey="task_creation_byTag" id="task_creation_byTag" title="Use existing tasks">

    <p className="mt-3 text-center">Click on the tags for their respective tasks.</p>
    <TagList toDoList={toDoList} toDoListHistory={toDoListHistory} filterResults={filterResults}></TagList>
    

    <Table className="mt-3 text-center">
            <thead className="mt-3">
                <tr>
                    <th style={{maxWidth: "10%"}}></th>
                    <th style={{width: "90%", textAlign: "center"}}></th>
                    <th className="d-none tag-column">Tags</th>
                    <th className="d-none due-column" style={{width: "30%"}} >Due</th>
                </tr>
            </thead>

            <tbody>
            {filteredResults.map(todo => {

                return (
                    <ToDoTaskSearched key={todo.id+todo.task} todo={todo} addTask={addTask} />         
                );
                    
            })}
            </tbody>
    </Table>
    </Tab>
    </Tabs>
    </>
  );
}

export default ToDoInputMobile;
