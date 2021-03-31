//Imports
import { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
//App Imports
import useGet from "../../hooks/useGet";
import { getActors } from "../../store/actor/actions";
import ErrorCard from "../common/ErrorCard";
import Loading from "../common/Loading";
import ActorContainer from "./ActorContainer";

export default function ActorRoutes(): ReactElement {
    const { url } = useRouteMatch();
    const { loading, error } = useGet("actors", getActors);

    if (loading) {
        return <Loading text={"Fetching actors data"} />;
    }
    if (error) {
        return <ErrorCard error={error} />;
    }
    return (
        <Switch>
            <Route exact path={`${url}/:id(\\d+)`} component={ActorContainer} />
            <Route path={`${url}/`} component={ActorContainer} />
        </Switch>
    );
}
