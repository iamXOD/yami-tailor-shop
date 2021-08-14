export interface User {
    username: string;
    admin: boolean;
}
export interface LoginPayload {
    username: string;
    password: string;
}

export { LogButton, LoginContainer, ProtectedRoute } from "./components";
export { UserProvider, useUser } from "./Context";
