//Imports
import { useMediaQuery } from "@material-ui/core";
import { ReactElement } from "react";
import { Route, useRouteMatch } from "react-router-dom";
// App Imports
import { Container, Item } from "../../components";
import { ActorAdd, AddButton } from "./Add";
import { ActorContainer } from "./Container";
import { ActorTable } from "./Table";

export function ActorRoute(): ReactElement {
    const { path } = useRouteMatch();
    const isMediumOrUp = useMediaQuery("(min-width:960px)");

    return (
        <Container justify="center" alignItems="center">
            <Route exact={!isMediumOrUp} path={`${path}/`}>
                <Item xs={12} md={6} lg={7} xl={8}>
                    <ActorTable />
                    <AddButton />
                </Item>
            </Route>
            <Route path={`${path}/:actorId(\\d+)`}>
                <Item xs={12} md={6} lg={5} xl={4}>
                    <ActorContainer />
                </Item>
            </Route>
            <Route path={`${path}/add`}>
                <Item xs={12} md={6} lg={5} xl={4}>
                    <ActorAdd />
                </Item>
            </Route>
        </Container>
    );
}
