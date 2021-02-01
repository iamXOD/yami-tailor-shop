//Imports
import { useState, useEffect } from "react";

//App Imports
import { api } from "../services";
import { OneOrMany } from "../types";
import { Entity } from "../store/models";

//Types
type Return<I> = { loading: boolean, data?: OneOrMany<I>, error?: Error };

export default function useFetch<I extends Entity>(url: string): Return<I> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<OneOrMany<I>>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (!url) return;
        setLoading(true);
        api.getData(url)
            .then(setData)
            .then(() => setLoading(false))
            .catch(err => {
                setLoading(false);
                setError(err);
            })
    }, [url]);
    return { loading, data, error };
}