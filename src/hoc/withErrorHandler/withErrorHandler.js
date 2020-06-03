import React, {Component} from "react";

import Modal from "../../components/UI/Modal/Modal"
import Aux from "../Auxiliary/Auxiliary"
import axios from "axios";


//this wraps the burger builder component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount(){
            //first, clear the errors
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            //set up global interceptors that allows us to handle errors
            //use function first takes response, then error
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }


        render(){
            return(
                <Aux>
                <Modal 
                    modalClosed={this.errorConfirmedHandler} 
                    show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}</Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            )

        }
    } 
}

export default withErrorHandler