// Imports
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from "@material-ui/core";
import { ArrowBack as BackIcon, Edit as EditIcon } from "@material-ui/icons";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { ReactElement } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { useUpdateMutation } from "../../hooks";
import { actorValidationSchema } from "../validationSchema";
import ActorForm from "./Form";

type Props = { actor: Actor };

export function ActorUpdate({ actor }: Props): ReactElement {
    const queryClient = useQueryClient();
    const history = useHistory();
    const goBack = () => history.goBack();
    const { mutateAsync } = useUpdateMutation<
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
    >(actorURL, String(actor.id), {
        onSuccess(actor) {
            queryClient
                .invalidateQueries([actorURL])
                .then(() =>
                    queryClient.setQueryData(
                        [actorURL, { id: String(actor.id) }],
                        actor
                    )
                );
        },
        onError(err) {
            const data = err.response?.data;
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
                return Promise.reject(err);
            }
        },
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: actorToForm(actor),
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
                title="Update Actor"
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
                        <EditIcon />
                        Update
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

function formToActor(actor: Actor): Actor {
    return {
        ...actor,
        home_phone: actor.home_phone || undefined,
        email: actor.email || undefined,
    };
}

function actorToForm(actor: Actor): Actor {
    return {
        ...actor,
        home_phone: actor.home_phone ?? "",
        email: actor.email ?? "",
    };
}
