//Imports
import decode from "jwt-decode";
import {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
//App Imports
import { User } from ".";
import { storage as st } from "../services";

interface UserContextValues {
    token?: string;
    user?: User;
    login: (token: string) => void;
    logout: () => void;
}

const initialToken = st.loadTOKEN();

const UserContext = createContext<UserContextValues | undefined>(undefined);

export function useUser(): UserContextValues {
    const values = useContext(UserContext);
    if (!values) {
        throw new Error("useUser must be used within UserProvider");
    }
    return values;
}

type Props = { children: ReactNode };
export function UserProvider({ children }: Props): ReactElement {
    const [token, setToken] = useState<string | undefined>(initialToken);
    const [user, setUser] = useState<User | undefined>(
        token ? decode<User>(token) : undefined
    );

    useEffect(() => {
        if (token) {
            setUser(decode<User>(token));
            st.saveTOKEN(token);
        } else {
            setUser(undefined);
            st.removeTOKEN();
        }
    }, [token]);

    const login = (token: string) => {
        setToken(token);
    };

    const logout = () => setToken(undefined);

    return (
        <UserContext.Provider value={{ user, login, logout, token }}>
            {children}
        </UserContext.Provider>
    );
}
