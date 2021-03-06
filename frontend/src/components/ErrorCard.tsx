//Imports
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container as MUIContainer,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import { ReactElement, ReactNode } from "react";
//App Imports
import { BackButton } from "./buttons/BackButton";

type Props = { error: Error; FixButton?: ReactNode };

export function ErrorCard({ error, FixButton }: Props): ReactElement {
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

export default ErrorCard;
