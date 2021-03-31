//Imports
import { ReactElement, ReactNode } from "react";
import { FetchProviderProps, Provider } from "use-http";
//App Imports
import config from "../config";
import { loadTOKEN } from "../services/storage";

type Props = { children: ReactNode };

export default function FetchProvider({ children }: Props): ReactElement {
    return (
        <Provider url={config.API} options={options}>
            {children}
        </Provider>
    );
}

const options: FetchProviderProps["options"] = {
    responseType: "json" as const,

    interceptors: {
        request: async ({ options }) => {
            options.headers = {
                ...options.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadTOKEN()}`,
            };
            return options;
        },
    },
};
