// Imports
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from "@material-ui/core";
import { Add as AddIcon, ArrowBack as BackIcon } from "@material-ui/icons";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { ReactElement } from "react";
import { useQueryClient } from "react-query";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { useAddMutation } from "../../hooks";
import { actorValidationSchema } from "../validationSchema";
import ActorForm from "./Form";

export function ActorAdd(): ReactElement {
    const queryClient = useQueryClient();
    const history = useHistory();
    const goBack = () => history.goBack();
    const { mutateAsync } = useAddMutation<
        Actor,
        AxiosError<{
            type: string;
            status: number;
            validationErrors: {
                message: string;
                error: string;
                path: string[];
            }[];
        }>
    >(actorURL, {
        onSuccess() {
            queryClient.invalidateQueries([actorURL]);
        },
        onError(error) {
            const data = error.response?.data;
            if (data && data.status == 400 && data.type == "validation-error") {
                const valErr = data.validationErrors.reduce(
                    (acc, curr) => ({
                        ...acc,
                        [curr.path.join(".")]: curr.message,
                    }),
                    {}
                );
                return Promise.reject({
                    ...data,
                    validationErrors: valErr,
                });
            } else {
                return Promise.reject(error);
            }
        },
    });

    const formik = useFormik({
        initialValues: initialActor,
        onSubmit: (actor, helpers) => {
            helpers.setSubmitting(true);
            mutateAsync(formToActor(actor))
                .then(goBack)
                .catch((err) => {
                    if (err.status === 400 && err.type === "validation-error") {
                        Object.entries<string>(err.validationErrors).forEach(
                            ([prop, message]) =>
                                helpers.setFieldError(prop, message)
                        );
                    }
                })
                .finally(() => helpers.setSubmitting(false));
        },
        validationSchema: actorValidationSchema,
    });
    return (
        <Card>
            <CardHeader
                title="Add Actor"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <ActorForm {...formik} />
            </CardContent>
            <CardActions>
                <ButtonGroup fullWidth={true}>
                    <Button
                        onClick={() => formik.handleSubmit()}
                        disabled={formik.isSubmitting || !formik.isValid}
                        variant="contained"
                        color="primary">
                        <AddIcon />
                        Add
                    </Button>
                    <Button onClick={goBack} variant="text" color="secondary">
                        <BackIcon />
                        Back
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
export function AddButton(): ReactElement {
    const { url } = useRouteMatch();
    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            component={Link}
            to={`${url}/add`}>
            <AddIcon />
            Add
        </Button>
    );
}

function formToActor(actor: Actor): Actor {
    return {
        ...actor,
        home_phone: actor.home_phone || undefined,
        email: actor.email || undefined,
    };
}

const initialActor: Actor = {
    name: "",
    mobile_phone: "",
    home_phone: "",
    email: "",
    gender: "F",
};
