import React, {Component} from "react";

import Modal from "../../components/UI/Modal/Modal"
import Aux from "../Auxiliary/Auxiliary"
import axios from "axios";


//this wraps the burger builder component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
             //first, clear the errors
             this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            //set up global interceptors that allows us to handle errors
            //use function first takes response, then error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        state = {
            error: null
        }

        componentWillUnmount(){
            //stop interceptors from updating infinitely
            axios.interceptors.request.eject(this.reqInterceptor)
                axios.interceptors.response.eject(this.resInterceptor)
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