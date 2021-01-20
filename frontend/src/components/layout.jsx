//Imports
import React, { Component } from "react";
import { connect } from "react-redux";

//UI Imports
import AppBar from "material-ui/AppBar";

//App Imports
import UserButtonLogin from "./user/button/login"
import UserButtonLogged from "./user/button/logged"

class Layout extends Component {
    render() {
        return <div>
            <AppBar
                title="Yami Tailor Shop"
                iconElementRight={this.props.isAuthenticated ?
                    <UserButtonLogged />
                    : <UserButtonLogin />} />
            {this.props.children}
        </div>
    }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user })

export default connect(mapStateToProps, {})(Layout);