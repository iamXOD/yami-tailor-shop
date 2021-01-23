//Imports
import React from "react";
import { Link } from "react-router-dom";

//UI imports
import FlatButton from "material-ui/FlatButton";

const UserButtonLogin = () => {
    return <Link to="/login">
        <FlatButton label="Login" />
    </Link>

}

export default UserButtonLogin;