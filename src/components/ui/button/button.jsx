import React from 'react';
import './button.css';

const button = props => (
    <button className={`CustomButton ${ props.btnType }`} onClick={ props.clicked } disabled={ props.disabled }>
        { props.children }
    </button>
)

export default button;