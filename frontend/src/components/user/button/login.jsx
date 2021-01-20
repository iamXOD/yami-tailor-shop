//Imports
import React from "react";
import { Link } from "react-router-dom";

//UI imports
import FlatButton from "material-ui/FlatButton";

const UserButtonLogin = (props) => {
    return <Link to="/login">
        <FlatButton {...props} label="Login" />
    </Link>

}

export default UserButtonLogin;