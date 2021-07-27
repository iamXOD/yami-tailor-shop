//Imports
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
//App Imports
import { ErrorCard } from "../../components";
import { useUser } from "../Context";
import { useLogin } from "../useLogin";
import LoginForm from "./LoginForm";

export function LoginContainer(): ReactElement {
    const history = useHistory();
    const { user } = useUser();
    const { login, error } = useLogin();

    user && history.goBack();
    if (error) {
        return <ErrorCard error={error} />;
    }

    return <LoginForm onSubmit={login} />;
}
