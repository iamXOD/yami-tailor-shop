//Imports
import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
//App Imports
import { storage as st } from "../services";
import { useUser } from "../user";

export function UserButtonLogin(): ReactElement {
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

export function UserButtonLogged(): ReactElement {
    const { logout } = useUser();

    return (
        <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
                st.removeTOKEN();
                logout();
            }}>
            Log Out
        </Button>
    );
}
