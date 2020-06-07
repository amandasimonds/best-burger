import React from "react";
import { withRouter } from "react-router-dom"

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
    //here we do not have params because it is not loaded through a route!
    //this is why we use withRouter from react-router-dom, and wrap the component with "withRouter()" at the bottom
    console.log(props)
   let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //return an array with number of spaces equal to number of ingredients
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })    
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add your favorite ingredients!</p>;
    };

    console.log(transformedIngredients)
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

export default withRouter(burger);