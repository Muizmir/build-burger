import React from 'react';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/ui/spinner/spinner';
import Aux from '../../hocs/hoc/auxillary';
import ErrorHandler from '../../hocs/error-handler/error-handler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 1.1,
    bacon: 0.5,
    meat: 1.8,
    cheese: 0.8
}

class BurgerBuilder extends React.Component{
    state = {
        ingredients:null,
        totalPrice: 3,
        purchase: false,
        order: false,
        loading: false,
        error: null
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch(
            error => this.setState({ error: error })
        )
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map( ing => {
            return ingredients[ing]
        }).reduce( (sum, el) => {
            return sum + el
        }, 0);
        this.setState({ purchase: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const addedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const deductedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    orderHandler = () => this.setState({ order: true })

    cancelOrderHandler = () => this.setState({ order: false })

    orderContinued = () => {
        const queryParams = [];

        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />;
        let orderSummary = null;

        if(this.state.ingredients){
            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchase={this.state.purchase}
                        order={this.orderHandler}
                        price={this.state.totalPrice} />
                </Aux>

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                orderCancelled={this.cancelOrderHandler}
                orderContinued={this.orderContinued} />
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

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

export default ErrorHandler(BurgerBuilder, axios) ;