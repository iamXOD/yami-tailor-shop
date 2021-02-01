//UI Imports
import Grid from "@material-ui/core/Grid";

//Types
import { ReactElement } from "react";
import { GridProps } from "@material-ui/core";

export function Item(props: Omit<GridProps, "item">): ReactElement {
    return <Grid item {...props} />
}

export function Container(props: Omit<GridProps, "container">): ReactElement {
    return <Grid container {...props} />
}