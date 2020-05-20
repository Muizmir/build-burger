import React from 'react';
import CheckoutSummary from '../../components/order/checkout-summary/checkout-summary';
import ContactData from '../../containers/checkout/contact-data/contact-data';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();   
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };
 
    let summary = <Redirect to='/' />
        
    if(props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;

        summary = 
            <div>
                { purchasedRedirect }
                <CheckoutSummary
                    ingredients={props.ings}
                    price={props.price}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(withRouter(Checkout));