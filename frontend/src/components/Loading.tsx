//Imports
import { CircularProgress, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactElement } from "react";
//App Imports
import { Container, Item } from "./Grid";

type Props = { text?: string };

const useStyles = makeStyles(({ spacing }: Theme) => ({
    progress: {
        margin: spacing(4),
    },
}));

export function Loading({ text }: Props): ReactElement {
    const classes = useStyles();
    return (
        <Container>
            <Item xs={2}></Item>
            <Item xs={8}>
                <CircularProgress
                    variant="indeterminate"
                    size={100}
                    className={classes.progress}
                />
                {text && <Typography variant="h5">{text}</Typography>}
            </Item>
            <Item xs={2}></Item>
        </Container>
    );
}

export default Loading;
