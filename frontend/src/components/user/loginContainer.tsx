import LoginForm from "./loginForm";
import { api } from "../../services";
import { UserState } from "../../types";
import { connect } from "react-redux";
import React, { useState } from "react";
import { userLogin } from "../../store/actions/user";
import { RouterProps } from "react-router-dom";

const login = (username: string, password: string): Promise<string> => {
    return api.postData("login", { username, password })
}

type Props = RouterProps & { userLogin: typeof userLogin }

const LoginContainer: React.VFC<Props> = (props) => {

    const [error, setError] = useState<Error | null>(null);

    const onSubmit = (username: string, password: string) => {
        return login(username, password)
            .then(token => {
                if (token && typeof token === "string" && token !== 'undefined' && token !== '') {
                    localStorage.setItem("token", token);
                    props.userLogin(username);
                    props.history.push("/about");
                } else {
                    setError(new Error("Invalid Token"));
                }
            })
    }
    return <LoginForm error={error} onSubmit={onSubmit} />;
}

const mapStateToProps = (state: UserState) => ({ isAuthenticated: state.isAuthenticated });

export default connect(mapStateToProps, ({ userLogin }))(LoginContainer)