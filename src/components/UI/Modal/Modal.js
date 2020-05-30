import React, {Component} from "react";

import classes from "./Modal.css"
import Aux from "../../../hoc/Auxiliary/Auxiliary"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }

    componentWillUpdate(){
        console.log("[Modal] willUpdate")
    }
    render(){
        return(
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
            style={{
                opacity: this.props.show ? "1" : "0",
                transform: this.props.show ? "translateY(0)" : "translateY(-100vh)"
            }}
            className={classes.Modal}>
            {this.props.children}
        </div>
        </Aux>
        )
    }
}

export default Modal;