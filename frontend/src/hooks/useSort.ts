//Imports
import { useEffect, useState } from "react";
//App Imports
import { Comparator, TableHeader } from "../types";

type Return<T> = {
    sortedHeaders: TableHeader<T>[];
    sortedItems: T[];
    sortBy: (index: number) => () => void;
};

export default function useSort<T>(
    headers: TableHeader<T>[],
    items: T[],
    comparator: (
        prop: keyof T,
        desc: boolean
    ) => Comparator<T> = defaultComparator
): Return<T> {
    const [sortedHeaders, setSortedHeaders] = useState<TableHeader<T>[]>(
        headers.filter(({ isHidden }) => !isHidden)
    );
    const [sortedItems, setSortedItems] = useState<T[]>(items);

    useEffect(() => {
        setSortedItems(items);
    }, [items]);

    function sortBy(index: number) {
        return function () {
            setSortedHeaders(
                sortedHeaders.map((column, i) => ({
                    ...column,
                    active: index === i,
                    order:
                        (index === i &&
                            (column.order === "desc" ? "asc" : "desc")) ||
                        undefined,
                }))
            );
            setSortedItems(
                sortedItems
                    .slice()
                    .sort(
                        comparator(
                            sortedHeaders[index].name,
                            sortedHeaders[index].order === "desc"
                        )
                    )
            );
        };
    }
    return { sortedHeaders, sortedItems, sortBy };
}

export function defaultComparator<T>(
    prop: keyof T,
    desc: boolean
): Comparator<T> {
    return (a: T, b: T) => {
        const order = desc ? -1 : 1;
        if (!a[prop]) {
            return 1 * order;
        }
        if (!b[prop]) {
            return -1 * order;
        }
        if (a[prop] < b[prop]) {
            return -1 * order;
        }
        if (a[prop] > b[prop]) {
            return 1 * order;
        }
        return 0 * order;
    };
}
