import Table from 'react-bootstrap/Table';

import ToDoTask from "./ToDoTask.js";

const ToDoOutput = ({toDoList}) => {
    
    
    return (
        <div>
        <p className="mt-3 text-center">Click on a todo task to mark as finished.</p>

        <Table className="m-3 text-center">
            <thead className="mt-3">
                <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Tags</th>
                </tr>
            </thead>

            <tbody>
            {toDoList.map(todo => {

                return (
                    <ToDoTask key={todo.id+todo.task} todo={todo}  />                
                );
                    
            })}
            </tbody>
        </Table>
        </div>

    );

}

export default ToDoOutput;