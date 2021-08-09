// Imports
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";

type Props = { actorId: number };
export function ActorNotFound({ actorId }: Props): ReactElement {
    const history = useHistory();
    return (
        <Card>
            <CardHeader
                title="Actor Not Found"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Typography align="center">
                    {`Actor with id of ${actorId} was not found`}
                </Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup fullWidth={true}>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => history.goBack()}>
                        <ArrowBack />
                        Back
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
