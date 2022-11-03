
import CustomFlexContainer from "./CustomFlexContainer";
import ToDoInputField from "./ToDoInputField";


import Form from 'react-bootstrap/Form';

function ToDoInput() {
  return (
    
    <Form className="mt-3" style={{width: "60vw", margin: "0 auto"}}>
    
    <CustomFlexContainer noOfChildren={1}>
        <ToDoInputField type="text" name="todo-name" placeholder="What do you want to do?"></ToDoInputField>
    </CustomFlexContainer>

    <CustomFlexContainer noOfChildren={1}>
        <ToDoInputField type="text" name="todo-tags" placeholder="What do you want to do?"></ToDoInputField>
        <ToDoInputField type="color" name="todo-color" placeholder="What do you want to do?"></ToDoInputField>
        <ToDoInputField type="date" name="todo-time" placeholder="What do you want to do?"></ToDoInputField>
        <ToDoInputField type="submit">Submit</ToDoInputField>
    </CustomFlexContainer>

    </Form>
  );
}

export default ToDoInput;
