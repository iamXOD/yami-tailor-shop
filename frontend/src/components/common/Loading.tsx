//UI Imports
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//App Imports
import { Item, Container } from "./Grid";

//Types
import { Theme } from "@material-ui/core";
import { ReactElement } from "react";
type Props = { text?: string };

const useStyles = makeStyles(({ spacing }: Theme) => ({
    progress: {
        margin: spacing(4)
    }
}))

export default function Loading({ text }: Props): ReactElement {
    const classes = useStyles();
    return <Container>
        <Item xs={2}>
        </Item>
        <Item xs={8}>
            <CircularProgress variant="indeterminate"
                size={100} className={classes.progress} />
            {text && <Typography variant="h5">{text}</Typography>}
        </Item>
        <Item xs={2}>
        </Item>
    </Container>
}