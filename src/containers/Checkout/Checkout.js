import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
    state={
        ingredients: null,
        price: 0
        }

    //there is no way to route to this component unless it is mounted again! (for componentdidmount)
    //componentwillmount allows us to set up the state prior to rendering the children
    componentWillMount(){
        //urlsearchparams extracts the query params
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === "price"){
                price = param[1]
            } else {
                //["salad", "1"]
                ingredients[param[0]] = +param[1]
            }
        }
        console.log("placed order", this.state.ingredients)
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + "/contact-data"}
                render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        )
    }
}

export default Checkout