import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
} from "@material-ui/core";
import {
    ArrowBack as BackIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import { ReactElement } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { useDeleteMutation } from "../../hooks";

type Props = { actor: Actor };

export function ActorDelete({ actor }: Props): ReactElement {
    const history = useHistory();
    const queryClient = useQueryClient();
    const { mutateAsync } = useDeleteMutation(actorURL, String(actor.id), {
        onSuccess() {
            queryClient.removeQueries([actorURL, { id: String(actor.id) }]);
            queryClient.invalidateQueries([actorURL]);
        },
    });
    const goBack = () => history.goBack();
    const del = async () =>
        await mutateAsync().then(() => history.push("/actors"));

    return (
        <Card>
            <CardHeader
                title="Delete Actor"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Typography align="center">{actor.name}</Typography>
                <Typography align="center">{actor.mobile_phone}</Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup fullWidth={true}>
                    <Button variant="contained" color="primary" onClick={del}>
                        <DeleteIcon />
                        Delete
                    </Button>
                    <Button color="secondary" variant="text" onClick={goBack}>
                        <BackIcon />
                        Back
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
