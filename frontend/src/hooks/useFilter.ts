//Imports
import { useEffect, useState } from "react";

export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;
type Return<I> = [I[], string, (search: string) => void];

export function useFilter<I>(
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

export default useFilter;
