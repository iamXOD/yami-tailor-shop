// Imports
import * as Yup from "yup";

const MOBILE_PHONE_REGEX = /^5[2-9][0-9]{6}$/;
const HOME_PHONE_REGEX = /^\d{8}$/;

export const actorValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .required("Name is required"),
    mobile_phone: Yup.string()
        .required("Mobile phone is required")
        .matches(
            MOBILE_PHONE_REGEX,
            "Phone must be a valid cuban mobile number"
        ),
    home_phone: Yup.string()
        .matches(HOME_PHONE_REGEX, {
            message: "Phone must be a valid cuban house number",
            excludeEmptyString: true,
        })
        .nullable(),
    email: Yup.string().email("Must be a valid email").nullable(),
});
