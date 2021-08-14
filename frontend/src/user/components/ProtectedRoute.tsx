// Imports
import { ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
// App Imports
import { useUser } from "..";

export function ProtectedRoute(props: RouteProps): ReactElement {
    const { token } = useUser();

    if (!token) {
        return <Redirect to="/login" push={true} />;
    }
    return <Route {...props} />;
}
