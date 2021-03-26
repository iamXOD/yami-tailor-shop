//Imports
import Button from "@material-ui/core/Button";
import { ReactElement } from "react";
//App Imports
import useLogout from "../../../hooks/useLogout";

export default function UserButtonLogged(): ReactElement {
    const [doLogout] = useLogout();

    return (
        <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={doLogout}>
            Log Out
        </Button>
    );
}
