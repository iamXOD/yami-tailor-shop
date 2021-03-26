//Imports
import { TableCell, TableRow, TableSortLabel } from "@material-ui/core";
import { ReactElement } from "react";
//App Imports
import { TableHeader } from "../../../types";

type Props<T> = {
    headers: TableHeader<T>[];
    sortBy: (index: number) => () => void;
};

export default function TableHeaderRow<T>({
    headers,
    sortBy,
}: Props<T>): ReactElement {
    return (
        <TableRow>
            {headers.map(
                ({ name, isNonSortable, isActive, order, label }, index) => (
                    <TableCell key={name.toString()}>
                        {isNonSortable ? (
                            label || name
                        ) : (
                            <TableSortLabel
                                active={isActive}
                                direction={order}
                                onClick={sortBy(index)}>
                                {label || name}
                            </TableSortLabel>
                        )}
                    </TableCell>
                )
            )}
        </TableRow>
    );
}
