import React from 'react';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/ui/spinner/spinner';
import Aux from '../../hocs/hoc/auxillary';
import ErrorHandler from '../../hocs/error-handler/error-handler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/exported-actions';


class BurgerBuilder extends React.Component{
    state = {
        order: false,
        loading: false,
        error: null
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map( ing => {
            return ingredients[ing]
        }).reduce( (sum, el) => {
            return sum + el
        }, 0);
        return sum > 0;
    }

    orderHandler = () => this.setState({ order: true })

    cancelOrderHandler = () => this.setState({ order: false })

    orderContinued = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render(){
        const disabledInfo ={
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = this.props.error ? <p> Ingredients can't be loaded </p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ings){
            burger =
                <Aux>
                <Burger ingredients={ this.props.ings } />
                    <BuildControls
                        ingredientAdded={ this.props.onIngredientAdded }
                        ingredientRemoved={ this.props.onIngredientRemoved }
                        disabled={ disabledInfo }
                        purchase={ this.updatePurchaseState(this.props.ings) }
                        order={ this.orderHandler }
                        price={ this.props.price } />
                </Aux>

            orderSummary = <OrderSummary
                ingredients={ this.props.ings }
                price={ this.props.price }
                orderCancelled={ this.cancelOrderHandler }
                orderContinued={ this.orderContinued } />
        }

        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }

        return(
            <Aux>
                <Modal show={ this.state.order } modalClosed={ this.cancelOrderHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios)) ;