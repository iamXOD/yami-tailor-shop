//Imports
import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
// App Imports
import { useUser } from "../Context";

export function LogButton(): ReactElement {
    const { user } = useUser();
    return user ? <UserButtonLogged /> : <UserButtonLogin />;
}

function UserButtonLogin(): ReactElement {
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

function UserButtonLogged(): ReactElement {
    const { logout } = useUser();

    return (
        <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={logout}>
            Log Out
        </Button>
    );
}
