//Imports
import { Link } from "react-router-dom";

//UI imports
import Button from "@material-ui/core/Button";

//Types
import { ReactElement } from "react";

export default function UserButtonLogin(): ReactElement {
    return <Button
        variant="contained" size="small"
        color="secondary"
        component={Link} to="/login">
        Login
        </Button>
}