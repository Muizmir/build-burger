import React from 'react';
import CheckoutSummary from '../../components/order/checkout-summary/checkout-summary';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();   
    };
    const checkoutContinuedHandler = () => {
        props.history.push('/contact-data');
    };
 
    let summary = <Redirect to='/' />
        
    if(props.ings){
        summary = <CheckoutSummary
                    ingredients={props.ings}
                    price={props.price}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
   
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));