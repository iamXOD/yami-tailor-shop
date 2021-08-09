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
import { useFormik } from "formik";
import { ReactElement } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { useAxios } from "../../hooks";
import { actorValidationSchema } from "../validationSchema";
import ActorForm from "./Form";

type Props = { actor: Actor };

export function ActorUpdate({ actor }: Props): ReactElement {
    const axios = useAxios();
    axios.interceptors.response.use(
        async (response) => {
            return response;
        },
        async function handleValidationError(error) {
            const {
                response: { data },
            } = error;
            if (data.status == 400 && data.type == "validation-error") {
                const valErr = data.validationErrors.reduce(
                    (acc: any, curr: any) => ({
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
        }
    );
    const queryClient = useQueryClient();
    const history = useHistory();
    const goBack = () => history.goBack();
    const { mutateAsync } = useMutation<Actor, Error, Actor>(
        async function (newActor: Actor): Promise<Actor> {
            return await axios
                .put(`${actorURL}/${newActor.id}`, newActor)
                .then((res) => res.data);
        },
        {
            onSuccess(actor) {
                queryClient.setQueryData([actorURL, String(actor.id)], actor);
                queryClient.invalidateQueries([actorURL], { exact: true });
            },
        }
    );

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
