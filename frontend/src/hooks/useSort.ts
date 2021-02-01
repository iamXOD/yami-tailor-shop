//Imports
import { useEffect, useState } from "react"

//Types
import { TableHeader } from "../types";
type Return<T> = {
    sortedHeaders: TableHeader<T>[],
    sortedItems: T[],
    sortBy: (index: number) => () => void
}

export default function useSort<T>(headers: TableHeader<T>[], items: T[]): Return<T> {
    const [sortedHeaders, setSortedHeaders] = useState<TableHeader<T>[]>(headers.filter(({ isHidden }) => !isHidden));
    const [sortedItems, setSortedItems] = useState<T[]>(items);

    useEffect(() => {
        setSortedItems(items);
    }, [items]);


    function comparator(prop: keyof T, desc: boolean) {
        return (a: T, b: T) => {
            const order = desc ? -1 : 1;
            if (!a[prop]) { return 1 * order }
            if (!b[prop]) { return -1 * order }
            if (a[prop] < b[prop]) { return -1 * order }
            if (a[prop] > b[prop]) { return 1 * order }
            return 0 * order;
        };
    }

    function sortBy(index: number) {
        return function () {
            setSortedHeaders(sortedHeaders
                .map((column, i) => ({
                    ...column,
                    active: index === i,
                    order: (index === i
                        && (column.order === "desc" ? "asc" : "desc"))
                        || undefined
                })));
            setSortedItems(sortedItems
                .slice()
                .sort(comparator(sortedHeaders[index].name,
                    sortedHeaders[index].order === "desc")))
        }
    }
    return { sortedHeaders, sortedItems, sortBy }
}