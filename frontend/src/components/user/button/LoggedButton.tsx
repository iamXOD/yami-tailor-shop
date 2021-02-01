//UI Imports
import Button from "@material-ui/core/Button";

//App Imports
import useLogout from "../../../hooks/useLogout";

//Types
import { ReactElement } from "react";

export default function UserButtonLogged(): ReactElement {
    const [doLogout] = useLogout();

    return <Button 
    variant="contained" size="small"
        color="secondary" onClick={doLogout}>
        Log Out
        </Button>;
}
