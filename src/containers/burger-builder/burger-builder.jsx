import React from 'react';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Aux from '../../hoc/aux';

const INGREDIENT_PRICES = {
    salad: 1.1,
    bacon: 0.5,
    meat: 1.8,
    cheese: 0.8
}

class BurgerBuilder extends React.Component{
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 3,
        purchase: false,
        order: false
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

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return(
            <Aux>
                <Modal show={ this.state.order }>
                    <OrderSummary ingredients={ this.state.ingredients } />
                </Modal>
                <Burger ingredients={ this.state.ingredients } />
                <BuildControls
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledInfo }
                    purchase={ this.state.purchase }
                    order={ this.orderHandler }
                    price={ this.state.totalPrice } />
            </Aux>
        )
    }
}

export default BurgerBuilder;