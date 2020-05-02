import React from 'react';
import './css/Button.css';

function Button(props){
    const className = 'button ${props.type}';

    return(
        <button className = {className} onClick = {props.handleClick}>
            {props.icon} {props.label}
        </button>
    );
}

Button.defaultProps = {
    type:"secondary"
};

export default Button;