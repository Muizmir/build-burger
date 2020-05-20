import React, {useState, useEffect } from 'react';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/ui/spinner/spinner';
import Aux from '../../hocs/hoc/auxillary';
import ErrorHandler from '../../hocs/error-handler/error-handler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/exported-actions';

const BurgerBuilder = props => {
    const {ings, price, error, history, isAuthenticated, onIngredientAdded,
         onIngredientRemoved, onInitIngredients, onInitPurchase, onSetAuthRedirectPath} = props;
    const [order, setOrder ] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients).map( ing => {
            return ingredients[ing]
        }).reduce( (sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const orderHandler = () => {
        if(isAuthenticated){
            setOrder(true);
        }else{
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }        

    const cancelOrderHandler = () => {
        setOrder(false);
    }

    const orderContinued = () => {
        onInitPurchase();
        history.push('/checkout');
    }    

    const disabledInfo ={
        ...ings
    }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = error ? <p> Ingredients can't be loaded </p> : <Spinner />;
        let orderSummary = null;

        if (ings){
            burger =
                <Aux>
                <Burger ingredients={ ings } />
                    <BuildControls
                        ingredientAdded={ onIngredientAdded }
                        ingredientRemoved={ onIngredientRemoved }
                        disabled={ disabledInfo }
                        purchase={ updatePurchaseState(ings) }
                        order={ orderHandler }
                        price={ price }
                        isAuth={ isAuthenticated } />
                </Aux>

            orderSummary = <OrderSummary
                ingredients={ ings }
                price={ price }
                orderCancelled={ cancelOrderHandler }
                orderContinued={ orderContinued } />
        }

        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }

        return(
            <Aux>
                <Modal show={ order } modalClosed={ cancelOrderHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPage(path))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ErrorHandler(BurgerBuilder, axios))) ;