//Imports
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import MUIContainer from "@material-ui/core/Container";
import { ReactElement, ReactNode } from "react";
//App Imports
import { BackButton } from "./ButtonLink";

type Props = { error: Error; FixButton?: ReactNode };

export default function ErrorCard({ error, FixButton }: Props): ReactElement {
    const { card, cardActions } = makeStyles(({ spacing }: Theme) => ({
        card: {
            maxWidth: 400,
            marginTop: spacing(2),
        },
        cardActions: {
            justifyContent: "center",
        },
    }))();

    return (
        <MUIContainer maxWidth="xs">
            <Card className={card}>
                <CardHeader title={error.name} subheader="Error" />
                <CardContent>
                    <Typography variant="subtitle1">{error.message}</Typography>
                </CardContent>
                <CardActions className={cardActions}>
                    {FixButton}
                    <BackButton text="Back" />
                </CardActions>
            </Card>
        </MUIContainer>
    );
}
