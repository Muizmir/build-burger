import * as actionTypes from '../actions/action-types';

const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 1.1,
    bacon: 0.5,
    meat: 1.8,
    cheese: 0.8
}

const burgerBuilderReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient] : state.ingredients[action.ingredient] + 1
                },
                totalPrice: (state.totalPrice + INGREDIENT_PRICES[action.ingredient]),
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    meat: action.ingredients.meat,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                },
                totalPrice: 3,
                error: false,
                building: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
};

export default burgerBuilderReducer;