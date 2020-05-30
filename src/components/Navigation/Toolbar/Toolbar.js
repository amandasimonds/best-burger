import React from "react";

import classes from "./Toolbar.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import SideDrawer from "../SideDrawer/SideDrawer"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar= (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle
            clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo} style={{borderRadius: "50%"}}><Logo /></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar