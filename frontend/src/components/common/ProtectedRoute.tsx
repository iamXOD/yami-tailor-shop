//Imports
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Route, RouteProps } from "react-router-dom";
//App Imports
import { State } from "../../store";

export default function ProtectedRoute(props: RouteProps): ReactElement {
    const { isAuthenticated } = useSelector((state: State) => state.user);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return <Route {...props} />;
}
