import React from 'react';
import './order.css';

const order = props => {
    const ingredients = [];
    for(let ing in props.ingredients){
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        })
    }

    const ingredientOutput = ingredients.map( ing => {
        return <span 
                    key={ing.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'in-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px',

                    }}>{ing.name} : {ing.amount} </span>
    })
    return (
        <div className='Order'>
            <p> Ingredients: { ingredientOutput } </p>
            <p> Price: <strong> $ {props.price.toFixed(2)} </strong></p>
        </div>
    )
}

export default order;