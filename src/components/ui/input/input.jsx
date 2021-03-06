import React from 'react';
import './input.css';

const input = props => {
    let inputElement = null;

    let classes = ['InputElement']

    if(props.invalid && props.shouldValidate && props.touched){
        classes.push('Invalid')
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input className={ classes.join(' ') } { ...props.elementConfig } value={ props.value } onChange={ props.changed } />;
            break; 
        
        case('text'):
            inputElement = <textarea className={ classes.join(' ') } {...props.elementConfig} value={props.value} onChange={ props.changed }/>;
            break;

        case ('select'):
            inputElement = <select className={ classes.join(' ') } value={props.value} onChange={ props.changed }>
                                {props.elementConfig.options.map( opt => (
                                    <option key={ opt.value } value={ opt.value }> { opt.displayValue } </option>
                                ))}
                           </select>;
            break;

        default:
            inputElement = <input className={ classes.join(' ') } {...props.elementConfig} value={props.value} /> 
    }

    return (
        <div className='Input'>
            <label className='Label'> { props.label } </label>
            { inputElement }
        </div>
    )
} 

export default input;