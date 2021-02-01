//UI Imports
import { TableCell, TableRow } from "@material-ui/core";

//App Imports
import { isPrimitive } from "../../../util";

//Types
import { ReactElement } from "react";
import { CustomRender, TableHeader } from "../../../types";
type Props<T> = {
    headers: TableHeader<T>[],
    item: T,
    customRender?: CustomRender<T>
}

export default function TableBodyRow<T>({ headers, item, customRender }: Props<T>): ReactElement {
    return <TableRow>
        {headers.map(({ name }) => {
            const customRenderCell = customRender?.[name];
            return <TableCell key={name.toString()}>
                {customRenderCell ? customRenderCell(item) :
                    isPrimitive(item[name]) ? item[name] : ""
                }
            </TableCell>
        })}
    </TableRow>
}