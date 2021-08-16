// Imports
import { AxiosError } from "axios";
import { ReactElement } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { useGetQuery } from "../../hooks";
import { ActorDelete } from "./Delete";
import { ActorDetails } from "./Details";
import { ActorNotFound } from "./NotFound";
import { ActorUpdate } from "./Update";

export function ActorContainer(): ReactElement {
    const { path } = useRouteMatch();
    const { actorId } = useParams<{ actorId: string }>();
    const {
        status,
        error,
        data: actor = {} as Actor,
    } = useGetQuery<Actor, AxiosError>(actorURL, actorId, {
        retry(_, error) {
            if (error.response?.status === 404) {
                return false;
            }
            return true;
        },
    });

    switch (status) {
        case "loading": {
            return <h1>Loading...</h1>;
        }
        case "error": {
            if (error?.response?.status === 404) {
                return <ActorNotFound actorId={Number(actorId)} />;
            }
            return <h1>{error?.message}</h1>;
        }
        case "success":
        default: {
            return (
                <Switch>
                    <Route path={`${path}/delete`}>
                        <ActorDelete actor={actor} />
                    </Route>
                    <Route path={`${path}/update`}>
                        <ActorUpdate actor={actor} />
                    </Route>
                    <Route>
                        <ActorDetails actor={actor} />
                    </Route>
                </Switch>
            );
        }
    }
}
