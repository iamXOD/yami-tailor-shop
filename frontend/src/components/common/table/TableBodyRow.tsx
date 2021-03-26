//Imports
import { TableCell, TableRow } from "@material-ui/core";
import { ReactElement } from "react";
//App Imports
import { CustomRender, TableHeader } from "../../../types";
import { isPrimitive } from "../../../util";

type Props<T> = {
    headers: TableHeader<T>[];
    item: T;
    customRender?: CustomRender<T>;
};

export default function TableBodyRow<T>({
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
