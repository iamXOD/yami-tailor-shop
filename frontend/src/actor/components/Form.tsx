//Imports
import { Container as MUIContainer, TextField } from "@material-ui/core";
import { FormikProps } from "formik";
import { ReactElement } from "react";
//App Imports
import { Actor } from "..";
import { Container, Item, RadioGroup } from "../../components";

type FormProps<T> = Pick<
    FormikProps<T>,
    | "errors"
    | "values"
    | "touched"
    | "handleBlur"
    | "handleChange"
    | "getFieldProps"
>;
export default function ActorForm({
    touched,
    errors,
    getFieldProps,
}: FormProps<Actor>): ReactElement {
    return (
        <MUIContainer maxWidth="md">
            <Container spacing={1}>
                <Item xs={12}>
                    <TextField
                        id="name"
                        label="Name"
                        placeholder="Yami"
                        autoFocus={true}
                        required={true}
                        fullWidth={true}
                        {...getFieldProps("name")}
                        error={!!errors.name && touched.name}
                        helperText={touched.name && errors.name}
                    />
                </Item>
                <Item xs={12} sm={6}>
                    <TextField
                        id="mobile_phone"
                        label="Mobile"
                        placeholder="5 x xxxxxx"
                        required={true}
                        fullWidth={true}
                        {...getFieldProps("mobile_phone")}
                        error={!!errors.mobile_phone && touched.mobile_phone}
                        helperText={touched.mobile_phone && errors.mobile_phone}
                    />
                </Item>
                <Item xs={12} sm={6}>
                    <TextField
                        id="home_phone"
                        label="Home"
                        placeholder="7 xxx xxxx"
                        fullWidth={true}
                        {...getFieldProps("home_phone")}
                        error={!!errors.home_phone && touched.home_phone}
                        helperText={touched.home_phone && errors.home_phone}
                    />
                </Item>
                <Item xs={12}>
                    <TextField
                        id="email"
                        label="Email"
                        placeholder="example@server.tld"
                        type="email"
                        fullWidth={true}
                        {...getFieldProps("email")}
                        error={!!errors.email && touched.email}
                        helperText={touched.email && errors.email}
                    />
                </Item>
                <Item xs={12}>
                    <RadioGroup
                        label="Gender"
                        {...getFieldProps("gender")}
                        options={[
                            { label: "Female", value: "F" },
                            { label: "Male", value: "M" },
                        ]}
                    />
                </Item>
            </Container>
        </MUIContainer>
    );
}
