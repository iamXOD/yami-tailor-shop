//Imports
import { TableCell, TableRow } from "@material-ui/core";
import { ReactElement } from "react";
//App Imports
import { isPrimitive } from "../util";
import { TableHeader } from "./TableHeaderRow";

export type CustomRender<T> = Partial<
    Record<keyof T, (item: T) => ReactElement>
>;

type Props<T> = {
    headers: TableHeader<T>[];
    item: T;
    customRender?: CustomRender<T>;
};

export function TableBodyRow<T>({
    headers,
    item,
    customRender,
}: Props<T>): ReactElement {
    return (
        <TableRow>
            {headers.map(({ name }) => {
                const customRenderCell = customRender?.[name];
                return (
                    <TableCell key={name.toString()}>
                        {customRenderCell
                            ? customRenderCell(item)
                            : isPrimitive(item[name])
                            ? item[name]
                            : ""}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

export default TableBodyRow;
