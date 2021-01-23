//Imports
import React from "react";
import { connect } from "react-redux";

//UI Imports
import AppBar from "material-ui/AppBar";

//App Imports
import UserButtonLogin from "./user/button/login"
import UserButtonLogged from "./user/button/logged"
import { UserState } from "../types";

const Layout: React.FunctionComponent<UserState> = (props) => {
    return <div>
        <AppBar
            title="Yami Tailor Shop"
            iconElementRight={props.isAuthenticated ?
                <UserButtonLogged />
                : <UserButtonLogin />} />
        {props.children}
    </div>
}


const mapStateToProps = (state: UserState): UserState => ({ isAuthenticated: state.isAuthenticated, username: state.username })

export default connect(mapStateToProps, {})(Layout);