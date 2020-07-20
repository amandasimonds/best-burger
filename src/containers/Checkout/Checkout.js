import React, {Component} from "react";
import {Route} from "react-router-dom";
import { connect } from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {


    //NOTES ON QUERY PARAMS, EVEN THOUGH HOPEFULLY WILL NOT HAVE TO 
    //there is no way to route to this component unless it is mounted again! (for componentdidmount)
    //componentwillmount allows us to set up the state prior to rendering the children
    // componentWillMount(){
    //     //urlsearchparams extracts the query params
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === "price"){
    //             price = param[1]
    //         } else {
    //             //["salad", "1"]
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     console.log("placed order", this.state.ingredients)
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + "/contact-data"}
                component={ContactData}
                //we don't need to do this now, because we can just use the store!
                // render = {(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        //make sure this all matches!!
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);