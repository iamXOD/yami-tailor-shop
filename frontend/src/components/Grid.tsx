//Imports
import { GridProps } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ReactElement } from "react";

export function Item(props: Omit<GridProps, "item">): ReactElement {
    return <Grid item {...props} />;
}

export function Container(props: Omit<GridProps, "container">): ReactElement {
    return <Grid container {...props} />;
}
