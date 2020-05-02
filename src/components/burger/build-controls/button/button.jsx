import React from 'react';
import './button.css'

const button = (props) => (
    <div className='Button'>
        <div className='Label'>{ props.label }</div>
        <button className='Less'
                onClick={ props.removed }
                disabled={ props.disabled }> Less </button>
        <button className='More' 
                onClick={ props.added }> More </button>
    </div>
)

export default button;