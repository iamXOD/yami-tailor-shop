// Imports
import { useMutation } from "react-query";
// App Imports
import { LoginPayload, User } from ".";
import { useAxios } from "../hooks";
import { useUser } from "./Context";

type ReturnType = {
    user?: User;
    error: Error | null;
    login: (user: LoginPayload) => void;
};
export function useLogin(): ReturnType {
    const axios = useAxios();
    const { login } = useUser();
    const { mutateAsync, error } = useMutation<string, Error, LoginPayload>(
        (user) => axios.post<string>("/login", user).then((res) => res.data),
        {
            onSuccess: (token) => {
                if (isValidToken(token)) login(token);
            },
        }
    );
    return { login: mutateAsync, error };
}

function isValidToken(token: string | undefined): token is string {
    return Boolean(token && typeof token == "string" && token !== "undefined");
}
