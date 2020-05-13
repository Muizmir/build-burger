import React from 'react';
import Burger from '../../burger/burger';
import Button from '../../ui/button/button';
import './checkout-summary.css';

const checkoutSummary = props => {
    return(
        <div className='CheckoutSummary'>
            <h1> {`Your burger costs $${ props.price.toFixed(2) }`} </h1>
            <div style={{ width: '100%', margin: '0 auto' }}>
                <Burger ingredients={ props.ingredients } />
            </div>
            <Button btnType='Danger' clicked={ props.checkoutCancelled }> CANCEL </Button>
            <Button btnType='Success' clicked={ props.checkoutContinued }> CONTINUE </Button>
        </div>
    )
}

export default checkoutSummary;