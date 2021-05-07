//Imports
import { TableBody, TableHead } from "@material-ui/core";
import MUITable from "@material-ui/core/Table";
import { ReactElement } from "react";
//App Imports
import { CustomRender, TableBodyRow } from "./TableBodyRow";
import { TableHeader, TableHeaderRow } from "./TableHeaderRow";

export interface TableProps<T> {
    headers: TableHeader<T>[];
    items: T[];
    customRender?: CustomRender<T>;
    sortBy?: (index: number) => () => void;
}

export function Table<T>({
    headers,
    items,
    customRender,
    sortBy,
}: TableProps<T>): ReactElement {
    return (
        <MUITable>
            <TableHead>
                <TableHeaderRow headers={headers} sortBy={sortBy} />
            </TableHead>
            <TableBody>
                {items.map((item, i) => (
                    <TableBodyRow
                        key={i}
                        headers={headers}
                        item={item}
                        customRender={customRender}
                    />
                ))}
            </TableBody>
        </MUITable>
    );
}

export default Table;
