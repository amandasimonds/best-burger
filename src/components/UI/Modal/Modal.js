import React from "react";

import classes from "./Modal.css"
import Aux from "../../../hoc/Auxiliary"
import Backdrop from "../Backdrop/Backdrop"

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div 
        style={{
            opacity: props.show ? "1" : "0",
            transform: props.show ? "translateY(0)" : "translateY(-100vh)"
        }}
        className={classes.Modal}>
        {props.children}
    </div>
    </Aux>
);

export default modal;