//Imports
import { Button, Typography } from "@material-ui/core";
import { Add as AddIcon, Edit as UpdateIcon } from "@material-ui/icons";
import { useFormik } from "formik";
import { ReactElement } from "react";
import * as Yup from "yup";
//App Imports
import { Actor } from "..";
import { Dialog } from "../../components";
import ActorForm from "./Form";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (actor: Actor) => Promise<Actor>;
    actor: Actor;
};
const mobilePhoneRegex = /^5[2-9][0-9]{6}$/;
const housePhoneRegex = /^\d{8}$/;

export default function ActorFormDialog({
    open,
    onClose,
    actor,
    onSubmit,
}: Props): ReactElement {
    const isDefActor = !actor.id || actor.id === -1;
    const title = isDefActor ? "Add" : "Update";
    const Icon = isDefActor ? AddIcon : UpdateIcon;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: actor,
        onSubmit: submit,
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
            home_phone: Yup.string()
                .matches(housePhoneRegex, {
                    message: "Phone must be a valid cuban house number",
                    excludeEmptyString: true,
                })
                .nullable(),
            email: Yup.string().email("Must be a valid email").nullable(),
        }),
    });

    async function submit(actor: Actor) {
        try {
            if (await onSubmit(actor)) {
                onCancel();
            }
        } catch (error) {
            if (error.status === 400) {
                formik.setErrors(error.object);
            } else {
                throw error;
            }
        }
    }

    function onCancel() {
        formik.resetForm();
        formik.setErrors({});
        onClose();
    }
    const formProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
        values: formik.values,
        errors: formik.errors,
        touched: formik.touched,
        getFieldProps: formik.getFieldProps,
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
                        onClick={() => formik.handleSubmit()}
                        disabled={formik.isSubmitting || !formik.isValid}
                        variant="contained"
                        color="primary">
                        <Icon />
                        {title}
                    </Button>
                </>
            }
        />
    );
}
