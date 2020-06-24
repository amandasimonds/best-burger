import React, {Component} from "react";

import classes from "./Backdrop.css"

class Backdrop extends Component {

        componentDidUpdate(){
            console.log("backdrop did update", this.props.show)
        }

        componentDidMount(){
            console.log("backdrop component", this.props.show)
        }
    
   render(){
       return(
        this.props.show === true ? 
        <div 
            className={classes.Backdrop}
            onClick={this.props.clicked}>
        </div> : null
       )
   } 
}

export default Backdrop;