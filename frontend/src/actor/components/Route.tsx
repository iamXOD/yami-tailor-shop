//Imports
import { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
//App Imports
import ActorContainer from "./Container";

export function ActorRoute(): ReactElement {
    const { url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${url}/:actorId(\\d+)`} component={ActorContainer} />
            <Route path={`${url}/`} component={ActorContainer} />
        </Switch>
    );
}

export default ActorRoute;
