//Imports
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import useFetch from "use-http";
//App Imports
import { saveTOKEN } from "../services/storage";
import { User } from "../store/models";
import { userLogin } from "../store/user/actions";
import { isValidToken } from "../util";

type Return = {
    login: (username: string, password: string) => void;
    error?: Error;
};

export default function useLogin(): Return {
    const { post, response, error } = useFetch("login");
    const dispatch = useDispatch();

    const login = async (username: string, password: string) => {
        const token = await post({ username, password });

        if (response.ok && isValidToken(token)) {
            saveTOKEN(token);
            const { username, admin } = decode<User>(token);
            dispatch(userLogin(username, admin));
        }
    };

    return { login, error };
}
