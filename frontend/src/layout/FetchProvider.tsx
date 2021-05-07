//Imports
import { ReactElement, ReactNode } from "react";
import { FetchProviderProps, Provider } from "use-http";
//App Imports
import config from "../config";
import { storage as st } from "../services";

type Props = { children: ReactNode };

export function FetchProvider({ children }: Props): ReactElement {
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
                Authorization: `Bearer ${st.loadTOKEN()}`,
            };
            return options;
        },
    },
};

export default FetchProvider;
