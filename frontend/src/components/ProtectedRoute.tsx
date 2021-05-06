//Imports
import { ReactElement } from "react";
import { Redirect } from "react-router";
import { Route, RouteProps } from "react-router-dom";
//App Imports
import { useUser } from "../user";

export function ProtectedRoute(props: RouteProps): ReactElement {
    const { user } = useUser();

    if (!user) {
        return <Redirect to="/login" />;
    }
    return <Route {...props} />;
}

export default ProtectedRoute;
