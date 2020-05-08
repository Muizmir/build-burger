import React from 'react';
import Aux from '../../../hocs/hoc/auxillary';
import Button from '../../ui/button/button';

class OrderSummary extends React.Component {
    // componentWillUpdate(){
    //     console.log('[Ordersummary] will update ')
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map( ing => {
            return (<li key={ ing }><span style={{ textTransform: 'capitalize' }}> { ing } </span>
                : { this.props.ingredients[ing] }</li>)
        })
        return(
            <Aux>
                <h3> Your Order </h3>
                <p> A yummy burger with the following ingredients: </p>
                <ul>
                    { ingredientSummary }
                </ul>
                <p><strong> Total Price: ${ this.props.price.toFixed(2) } </strong></p>
                <p> Continue to checkout? </p>
                <Button btnType='Danger' clicked={ this.props.orderCancelled }> CANCEL </Button>
                <Button btnType='Success' clicked={ this.props.orderContinued }> CONTINUE </Button>
            </Aux>
        )
    }
}

export default OrderSummary;