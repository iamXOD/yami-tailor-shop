//Imports
import decode from "jwt-decode";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
//App Imports
import { User } from "..";
import { ErrorCard } from "../../components";
import { saveTOKEN } from "../../services/storage";
import { useUser } from "../Context";
import LoginForm from "./LoginForm";

export function LoginContainer(): ReactElement {
    const history = useHistory();
    const { user, login } = useUser();
    const { post, error } = useFetch("login");

    const onLogin = async (username: string, password: string) => {
        const token = await post({ username, password });

        if (isValidToken(token)) {
            saveTOKEN(token);
            const { username, admin } = decode<User>(token);
            login({ username, admin });
        }
    };

    user && history.goBack();

    if (error) {
        return <ErrorCard error={error} />;
    }

    return <LoginForm onSubmit={onLogin} />;
}

function isValidToken(token: string | undefined): token is string {
    if (token && typeof token == "string" && token !== "undefined") {
        return true;
    }
    return false;
}

export default LoginContainer;
