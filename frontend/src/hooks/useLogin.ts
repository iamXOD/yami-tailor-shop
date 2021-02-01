//Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

//App Imports
import { api, storage } from "../services";
import { userLogin } from "../store/user/actions";
import { isValidToken } from "../util";

//Types
import { User } from "../store/models";
type Return = { doLogin: { (username: string, password: string): void }, error?: Error };

export default function useLogin(): Return {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<Error>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (username && password) {
            api.postData("login", { username, password })
                .then(token => {
                    if (isValidToken(token)) {
                        storage.saveTOKEN(token);
                        return decode<User>(token);
                    }
                    throw new Error("Invalid Token");
                }).then(({ username, admin }) => dispatch(userLogin(username, admin)))
                .catch(err => setError(err));
        }
    }, [username, password]);
    function doLogin(username: string, password: string) {
        setUsername(username);
        setPassword(password);
    }

    return { doLogin, error };
}