//Imports
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import useFetch from "use-http";
//App Imports
import { saveTOKEN } from "../../services/storage";
import { isValidToken } from "../../util";
import { User, userLogin } from "../store";

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
