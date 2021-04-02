//Imports
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Edit";
import { useFormik } from "formik";
import { ReactElement } from "react";
import * as Yup from "yup";
//App Imports
import useAdd from "../../hooks/useAdd";
import useUpdate from "../../hooks/useUpdate";
import { addActor, updateActor } from "../../store/actor/actions";
import { Actor } from "../../store/models";
import Dialog from "../common/Dialog";
import ActorForm from "./ActorForm";

type Props = {
    open: boolean;
    onClose: () => void;
    actor: Actor;
};
const mobilePhoneRegex = /^5[2-9][0-9]{6}$/;
const housePhoneRegex = /^\d{8}$/;

export default function ActorFormDialog({
    open,
    onClose,
    actor,
}: Props): ReactElement {
    const add = useAdd("actors", addActor);
    const edit = useUpdate("actors", updateActor);

    const isDefActor = !actor.id || actor.id === -1;
    const title = isDefActor ? "Add" : "Update";
    const Icon = isDefActor ? AddIcon : UpdateIcon;
    const action = isDefActor ? add : edit;
    let submitted = false;

    const {
        errors,
        getFieldProps,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        resetForm,
        touched,
        values,
    } = useFormik({
        enableReinitialize: true,
        initialValues: actor,
        onSubmit: onSubmit,
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "Name must be at least 3 characters long")
                .required("Name is required"),
            mobile_phone: Yup.string()
                .required("Mobile phone is required")
                .matches(
                    mobilePhoneRegex,
                    "Phone must be a valid cuban mobile number"
                ),
            home_phone: Yup.string().notRequired().matches(housePhoneRegex, {
                message: "Phone must be a valid cuban house number",
                excludeEmptyString: true,
            }),
            email: Yup.string().email("Must be a valid email").notRequired(),
        }),
    });

    async function onSubmit(actor: Actor) {
        if (await action(actor)) {
            submitted = true;
            resetForm();
        }
    }
    async function submitAndClose() {
        handleSubmit();
        if (submitted) {
            onClose();
        }
    }

    function onCancel() {
        resetForm();
        onClose();
    }
    const formProps = {
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        getFieldProps,
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            Title={<Typography variant="h4">{title}</Typography>}
            Content={<ActorForm {...formProps} />}
            Actions={
                <>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        onClick={submitAndClose}
                        disabled={isSubmitting || !isValid}
                        variant="contained"
                        color="primary">
                        <Icon />
                        {title}
                    </Button>
                    {isDefActor && (
                        <Button
                            onClick={() => handleSubmit()}
                            disabled={isSubmitting || !isValid}
                            variant="contained"
                            color="primary">
                            <Icon />
                            Add and Continue
                        </Button>
                    )}
                </>
            }
        />
    );
}
