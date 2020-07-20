import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                //don't forget to create deep clones of objects - you have to deep clone nesting objects too
                ingredients: {
                    ...state.ingredients,
                    //vvES6 syntax to dynamically override a given javascript object using brackets
                    //pass a variable that contains a name you actually want to use as a property name
                    //(look on adding ingredients through reducer if you are still confuzzled)
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default :
            return state;
    }
};

export default reducer