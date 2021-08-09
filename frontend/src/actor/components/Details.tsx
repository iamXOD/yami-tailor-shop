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
import {
    ArrowBack,
    Delete as DeleteIcon,
    Edit as UpdateIcon,
} from "@material-ui/icons";
import { ReactElement } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
// App Imports
import { Actor } from "..";
import { Container, Item } from "../../components";

type Props = { actor: Actor };
export function ActorDetails({ actor }: Props): ReactElement {
    const { url } = useRouteMatch();
    const history = useHistory();

    const { name, mobile_phone, home_phone, email, gender } = actor;

    const match = name.match(NAME_DIVIDER_REGEXP);
    const first = match?.[1];
    const rest = match?.[3];

    return (
        <Card>
            <CardHeader
                title={first || name}
                subheader={rest}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Container spacing={1}>
                    <Item xs={12} lg={6}>
                        <Typography variant="body1" align="center">
                            Mobile: {mobile_phone}
                        </Typography>
                    </Item>
                    {home_phone && (
                        <Item xs={12} lg={6}>
                            <Typography variant="body1" align="center">
                                {`Home: ${home_phone}`}
                            </Typography>
                        </Item>
                    )}
                    {email && (
                        <Item xs={12} lg={6}>
                            <Typography variant="body1" align="center">
                                {`Email: ${email}`}
                            </Typography>
                        </Item>
                    )}
                    <Item xs={12} lg={6}>
                        <Typography variant="body1" align="center">
                            Gender: {gender === "F" ? "Female" : "Male"}
                        </Typography>
                    </Item>
                </Container>
            </CardContent>
            <CardActions>
                <ButtonGroup fullWidth={true}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`${url}/update`}>
                        <UpdateIcon />
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`${url}/delete`}>
                        <DeleteIcon />
                        Delete
                    </Button>
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

const NAME_DIVIDER_REGEXP = /([^ ]+)( (.+))?/;
