import React from "react"

import classes from "./DrawerToggle.css"

const drawerToggle = (props) => (
    <button 
        className={classes.DrawerToggle}
        onClick={props.openSideDrawer}
        >MENU</button>
)

export default drawerToggle