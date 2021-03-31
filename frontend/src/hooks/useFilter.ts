//Imports
import { useEffect, useState } from "react";
//App Imports
import { Predicate } from "../types";

type Return<I> = [I[], string, (search: string) => void];

export default function useFilter<I>(
    items: I[],
    filter: (query: string) => Predicate<I>
): Return<I> {
    const [search, setSearch] = useState("");

    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        setFilteredItems(items.filter(filter(search)));
    }, [search, items]);

    return [filteredItems, search, setSearch];
}
