import React, {Component} from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner"

import axios from "../../../axios-orders"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
    },
    loading: false
}

orderHandler = (event) => {
    event.preventDefault();
      this.setState({loading: true})
      const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
              name: "Max",
              address: {
                  street: "test street",
                  zipCode: "21136",
                  country: "USA"
              },
              email: "test@test.gmail.com",
          },
          deliveryMethod: "toGo"
      }
      //in the axios post request we take 2 arguments
      //1st - the post url, 2nd- the data we are passing :)
      axios.post("/orders.json", order)
        .then(response => {
            this.setState({loading:false })
            this.props.history.push("/");
            alert("Your order was placed!")
        })
        .catch(error => {
            this.setState({loading:false })
        });
}

render(){

    let form = ( <form>
        <input className={classes.Input} type="text" name="name" placeholder="your name"/>
        <input className={classes.Input} type="text" name="email" placeholder="your email"/>
        <input className={classes.Input} type="text" name="street" placeholder="your street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="your postal code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
    if (this.state.loading){
        form = <Spinner />
    }
    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
           {form}
        </div>
    )
}
}

export default ContactData