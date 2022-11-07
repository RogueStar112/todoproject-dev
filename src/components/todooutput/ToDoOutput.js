import Table from 'react-bootstrap/Table';

import ToDoTask from "./ToDoTask.js";

const ToDoOutput = ({toDoList, counter, toggleTask}) => {
    
    
    
    return (
        <div>
        <h3 className="mt-3 text-center">Task list</h3>
        <p className="mt-3 text-center">Click on a todo task to mark as finished.</p>

        <Table className="mt-3 text-center">
            <thead className="mt-3">
                <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Tags</th>
                    <th>Due</th>
                </tr>
            </thead>

            <tbody>
            {toDoList.map(todo => {

                return (
                    <ToDoTask key={todo.id+todo.task} toDoList={toDoList} todo={todo} counter={counter} toggleTask={toggleTask}   />                
                );
                    
            })}
            </tbody>
        </Table>
        </div>

    );

}

export default ToDoOutput;