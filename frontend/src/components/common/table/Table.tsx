//Imports
import { TableBody, TableHead } from "@material-ui/core";
import MUITable from "@material-ui/core/Table";
import { ReactElement } from "react";
import { TableProps } from "../../../types";
import TableBodyRow from "./TableBodyRow";
import TableHeaderRow from "./TableHeaderRow";

export default function Table<T>({
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
