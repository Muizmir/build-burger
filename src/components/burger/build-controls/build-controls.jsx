import React from 'react';
import Button from './button/button'

import './build-controls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' }
]

const buildControls = (props) => (
    <div className='BuildControls'>
        <p> Total Price: <strong>${ props.price.toFixed(2) }</strong> </p>
        {controls.map( btn => (
            <Button 
                key={ btn.label } 
                label={ btn.label } 
                added={ () => props.ingredientAdded(btn.type) }
                removed={ () => props.ingredientRemoved(btn.type) }
                disabled={ props.disabled[btn.type]} />
        ))}
        <button className='OrderButton'
                disabled={ !props.purchase }
                onClick={ props.order }> { props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'} </button>
    </div>
)

export default buildControls;