//Imports
import { useEffect, useState } from "react";
//App Imports
import api from "../services/api";

type Return<I> = { loading: boolean; data?: I; error?: Error };

export default function useFetch<I>(url: string): Return<I> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<I>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (!url) return;
        let mounted = true;
        setLoading(true);
        api.get(url)
            .then(({ data }) => {
                if (mounted) {
                    setData(data);
                }
            })
            .catch((err) => {
                if (mounted) {
                    setError(err);
                }
            })
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                }
            });
        return () => {
            mounted = false;
        };
    }, [url]);
    return { loading, data, error };
}
