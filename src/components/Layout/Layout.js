import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary"
import classes from "./Layout.css"

import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle"

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render(){
        return(
            <Aux>
                <Toolbar/>
            <DrawerToggle
                openSideDrawer={this.sideDrawerOpenedHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }
};

export default Layout;