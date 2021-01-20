import React from "react";
import { connect } from "react-redux";


//UI Imports
import FlatButton from "material-ui/FlatButton";

//App Imports
import { userLogout } from "../../../store/actions/user"

const UserButtonLogged = (props) => {
    return <FlatButton
        label="Log out"
        onClick={props.userLogout} />;
}

export default connect(null, { userLogout })(UserButtonLogged);