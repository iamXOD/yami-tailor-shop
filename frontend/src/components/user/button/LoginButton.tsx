//Imports
import Button from "@material-ui/core/Button";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function UserButtonLogin(): ReactElement {
    return (
        <Button
            variant="contained"
            size="small"
            color="secondary"
            component={Link}
            to="/login">
            Login
        </Button>
    );
}
