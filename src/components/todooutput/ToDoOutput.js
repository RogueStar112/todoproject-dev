import Table from 'react-bootstrap/Table';

import ToDoTask from "./ToDoTask.js";

const ToDoOutput = ({toDoList, counter, toggleTask}) => {
    
    
    
    return (
        <div>
        <h3 className="mt-3 text-center superbold">Task list</h3>
        <p className="mt-3 text-center">Click on a todo task to mark as finished.</p>

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

            {
                (toDoList.length === 0 ? <tr><td colspan="4">No tasks on list.</td></tr> : toDoList.map(todo => {

                        return (
                            <ToDoTask key={todo.id+todo.task} toDoList={toDoList} todo={todo} counter={counter} toggleTask={toggleTask}   />                
                        );
                            
                    })) 

                    
        
            }
            </tbody>
        </Table>
        </div>

    );

}

export default ToDoOutput;