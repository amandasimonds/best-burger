import React, {Component} from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import axios from "../../../axios-orders"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: "fastest",
                validation:{},
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

orderHandler = (event) => {
    event.preventDefault();
      this.setState({loading: true})
      const formData ={};
      for (let formElementIdentifier in this.state.orderForm) {
          //we take the form element identifier, and set it equal to what the user entered
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
      }
      const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
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

checkValidity(value, rules){
    let isValid = true;

    //if the property cannot be found, then return true (to fix the drop down bug)
    if (!rules){
        return true;
    }

    //does the rules have a required property?
    if (rules.required){
        //check if the value is an empty string, use trim to remove any white space
        isValid = value.trim() !== "" && isValid;
    };

    if (rules.minLength){
        //we added && isValid to every statement, so it has to check every statement and it doesnt only check the last one.
        isValid = value.length >= rules.minLength && isValid;
    };

    if (rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    //return true or false
    return isValid;
}

inputChangedHandler(event, inputIdentifier){
    const updatedOrderForm = {
        //this will not clone deeply, it will still be mutated
        ...this.state.orderForm
    };
    //this will create an accurate clone
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    //pass the updated form value, and updated form validation object
    //storing the result (true or false) in the property
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //changes the "touched" property to true on change
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    //we set the value to true initially, so that it has to check for both in every property in the loop, it doesn't just check the last one
    //if one thing is false, it will make the formIsValid false
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    console.log(this.state.formIsValid)
}

render(){
    const formElementsArray = [];
    for (let key in this.state.orderForm){
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        })
    }

    let form = ( <form onSubmit={this.orderHandler}>
        <Input elementType="..." elementConfig="..." value="..."/>
        {formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                //get the event object that it creates automatically from the form
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                // changed={this.inputChangedHandler}/>
        ))}
        <Button 
            btnType="Success" 
            //our button component doesn't know what disabled means! don't forget to pass the prop to the component
            disabled={!this.state.formIsValid}>ORDER</Button>
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