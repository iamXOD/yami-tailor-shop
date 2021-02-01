//UI Imports
import { TableBody, TableHead } from "@material-ui/core";
import MUITable from "@material-ui/core/Table"

//App Imports
import TableHeaderRow from "./TableHeaderRow";
import TableBodyRow from "./TableBodyRow";
import useSort from "../../../hooks/useSort";

//Types
import { ReactElement } from "react";
import { CustomRender, Predicate, TableHeader } from "../../../types";
type Props<T> = {
    headers: TableHeader<T>[],
    items: T[],
    customRender?: CustomRender<T>,
    filterPredicate?: Predicate<T>
}

export default function Table<T>({ headers, items, customRender, filterPredicate }: Props<T>): ReactElement {

    const { sortedHeaders, sortedItems, sortBy } = useSort<T>(headers.filter(({ isHidden }) => !isHidden), items);
    return <MUITable>
        <TableHead>
            <TableHeaderRow headers={sortedHeaders} sortBy={sortBy} />
        </TableHead>
        <TableBody>
            {(filterPredicate ? sortedItems.filter(filterPredicate) : sortedItems).map((item, i) => (
                <TableBodyRow key={i} headers={sortedHeaders}
                    item={item} customRender={customRender} />))}
        </TableBody>
    </MUITable>
}
