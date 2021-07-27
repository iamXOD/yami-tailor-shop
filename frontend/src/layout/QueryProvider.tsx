// Imports
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

type Props = { children: ReactNode };
export function QueryProvider({ children }: Props): ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
