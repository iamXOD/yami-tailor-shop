//Imports
import { TableBody, TableHead } from "@material-ui/core";
import MUITable from "@material-ui/core/Table";
import { ReactElement } from "react";
//App Imports
import useSort from "../../../hooks/useSort";
import { CustomRender, TableHeader } from "../../../types";
import TableBodyRow from "./TableBodyRow";
import TableHeaderRow from "./TableHeaderRow";

type Props<T> = {
    headers: TableHeader<T>[];
    items: T[];
    customRender?: CustomRender<T>;
};

export default function Table<T>({
    headers,
    items,
    customRender,
}: Props<T>): ReactElement {
    const { sortedHeaders, sortedItems, sortBy } = useSort<T>(
        headers.filter(({ isHidden }) => !isHidden),
        items
    );
    return (
        <MUITable>
            <TableHead>
                <TableHeaderRow headers={sortedHeaders} sortBy={sortBy} />
            </TableHead>
            <TableBody>
                {sortedItems.map((item, i) => (
                    <TableBodyRow
                        key={i}
                        headers={sortedHeaders}
                        item={item}
                        customRender={customRender}
                    />
                ))}
            </TableBody>
        </MUITable>
    );
}
