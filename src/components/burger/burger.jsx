import React from 'react';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

import './burger.css'

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map( ing => {
        return [...Array(props.ingredients[ing])].map( (_, i) => {
            return <BurgerIngredients key={ing + i} type={ing} />
        })
    }).reduce( (arr, el) => {
        return arr.concat(el)
    }, [])

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients to the burger</p>
    }

    return(
        <div className='Burger'>
            <BurgerIngredients type='bread-top' />
            { transformedIngredients}
            <BurgerIngredients type='bread-bottom' />
        </div>
    )
}

export default Burger;