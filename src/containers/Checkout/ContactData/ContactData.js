import React, {Component} from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
    }
}

render(){
    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input type="text" name="name" placeholder="your name"/>
                <input type="text" name="email" placeholder="your email"/>
                <input type="text" name="street" placeholder="your street"/>
                <input type="text" name="postal" placeholder="your postal code"/>
                <Button btnType="Success">ORDER</Button>
            </form>
        </div>
    )
}
}

export default ContactData