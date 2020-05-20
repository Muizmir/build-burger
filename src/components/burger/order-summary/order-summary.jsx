import React from 'react';
import Aux from '../../../hocs/hoc/auxillary';
import Button from '../../ui/button/button';

const OrderSummary = props => {
    const { ingredients, price, orderCancelled, orderContinued } = props;
        const ingredientSummary = Object.keys(ingredients).map( ing => {
            return (<li key={ ing }><span style={{ textTransform: 'capitalize' }}> { ing } </span>
                : { ingredients[ing] }</li>)
        })
        return(
            <Aux>
                <h3> Your Order </h3>
                <p> A yummy burger with the following ingredients: </p>
                <ul>
                    { ingredientSummary }
                </ul>
                <p><strong> Total Price: ${ price.toFixed(2) } </strong></p>
                <p> Continue to checkout? </p>
                <Button btnType='Danger' clicked={ orderCancelled }> CANCEL </Button>
                <Button btnType='Success' clicked={ orderContinued }> CONTINUE </Button>
            </Aux>
        )
}

export default OrderSummary;