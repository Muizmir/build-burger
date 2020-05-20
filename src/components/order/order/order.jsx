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
                    className='OrderItems'> {ing.name} : {ing.amount} </span>
    })
    return (
        <div className='Order'>
            <p> <strong> Ingredients : </strong> { ingredientOutput } </p>
            <p> <strong> Price : </strong> ${props.price.toFixed(2)} </p>
        </div>
    )
}

export default order;