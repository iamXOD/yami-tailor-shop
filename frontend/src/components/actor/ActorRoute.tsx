//Imports
import { Route, useRouteMatch, Switch, Link } from "react-router-dom";
import { useSelector } from "react-redux";

//UI Imports
import { Button } from "@material-ui/core";

//App Imports
import ActorContainer from "./ActorContainer";
import ErrorCard from "../common/ErrorCard";
import Loading from "../common/Loading";
import useGet from "../../hooks/useGet";
import { getActors } from "../../store/actor/actions";
import { actorEntityToActor } from "../../util/transform";

//Types
import { ReactElement } from "react";
import { State } from "../../types";

export default function ActorRoutes(): ReactElement {
    const { url } = useRouteMatch();
    const { isAuthenticated } = useSelector((state: State) => state.user);
    const { loading, error } = useGet("actors", getActors, actorEntityToActor);

    if (!isAuthenticated) {
        const unauthorizeError = new Error("You are not Authenticated.")
        unauthorizeError.name = "UnauthorizeError"
        return <ErrorCard
            FixButton={<Button component={Link}
                variant="contained" color="primary"
                to="/login">Login</Button>}
            error={unauthorizeError} />;
    }
    if (loading) {
        return <Loading text={"Fetching actors data"} />
    }
    if (error) {
        return <ErrorCard error={error} />;
    }
    return <Switch>
        <Route exact path={`${url}/:id(\\d+)`} component={ActorContainer} />
        <Route exact path={`${url}/`} component={ActorContainer} />
    </Switch>
}