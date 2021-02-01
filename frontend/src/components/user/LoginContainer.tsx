//Imports
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

//App Imports
import LoginForm from "./LoginForm";
import useLogin from "../../hooks/useLogin";
import ErrorCard from "../common/ErrorCard";

//Types
import { ReactElement } from "react";
import { State } from "../../types";

export default function LoginContainer(): ReactElement {
    const history = useHistory();
    const { isAuthenticated } = useSelector((state: State) => state.user);
    const { doLogin, error } = useLogin();

    isAuthenticated && history.goBack();

    if (error) {
        return <ErrorCard error={error} />
    }

    return <LoginForm onSubmit={doLogin} />;
}