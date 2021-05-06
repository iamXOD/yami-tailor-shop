//Imports
import decode from "jwt-decode";
import {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
} from "react";
//App Imports
import { User } from ".";
import { loadTOKEN } from "../services/storage";

interface UserContextValues {
    user?: User;
    login: (user: User) => void;
    logout: () => void;
}

const token = loadTOKEN();
const initialUser = token ? decode<User>(token) : undefined;

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
    const [user, setUser] = useState<User | undefined>(initialUser);
    const login = (user: User) => setUser(user);
    const logout = () => setUser(undefined);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
