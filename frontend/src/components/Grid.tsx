//Imports
import { Grid, GridProps } from "@material-ui/core";
import { ReactElement } from "react";

export function Item(props: Omit<GridProps, "item">): ReactElement {
    return <Grid item {...props} />;
}

export function Container(props: Omit<GridProps, "container">): ReactElement {
    return <Grid container {...props} />;
}
