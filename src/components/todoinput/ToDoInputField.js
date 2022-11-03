
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ToDoInputField = (props) => {
    return (
      <div className="mx-2" style={{position: "relative", width: "100%"}}>
      <Form.Label size="sm" className="mx-2 d-none d-xl-block" style={{position: "absolute", bottom:"30px", display: "", fontSize: "10px"}}>{props.label}</Form.Label>

      <Form.Control className="mx-2" type={props.type} value={props.value} onChange={props.onChange} name={props.name} placeholder={props.placeholder} style={{width: "100%"}}>
      </Form.Control>
      </div>
    );
  }
  
  export default ToDoInputField;
  