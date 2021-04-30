//Imports
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//App Imports
import { ErrorCard } from "../../components";
import { State } from "../../store";
import useLogin from "../hooks/useLogin";
import LoginForm from "./LoginForm";

export default function LoginContainer(): ReactElement {
    const history = useHistory();
    const { isAuthenticated } = useSelector((state: State) => state.user);
    const { login, error } = useLogin();

    isAuthenticated && history.goBack();

    if (error) {
        return <ErrorCard error={error} />;
    }

    return <LoginForm onSubmit={login} />;
}
