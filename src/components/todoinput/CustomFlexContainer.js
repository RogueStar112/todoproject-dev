
import Form from 'react-bootstrap/Form';

const CustomFlexContainer = (props) => {
    return (
        <div className="my-3 col-lg-3 col-xs-12" style={{display: "flex", width: `calc(100% / ${props.noOfChildren})`, margin: "0 auto", float: "left"}}>
            {props.children}
        </div>
    );
}

export default CustomFlexContainer;