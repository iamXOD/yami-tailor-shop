//Imports
import { ReactElement } from "react";
//App Imports
import { Actor } from "..";
import { ActionTable, customRenderFn, TableHeader, useSort } from "../../table";

type Props<T> = {
    items: T[];
    onDeleteButton: customRenderFn<T>;
    onDetailButton: customRenderFn<T>;
    onUpdateButton: customRenderFn<T>;
};

export default function ActorTable(props: Props<Actor>): ReactElement {
    const { items, ...remainingProps } = props;
    const headers: TableHeader<Actor>[] = [
        { name: "name", isActive: false, label: "Name" },
        { name: "mobile_phone", isActive: false, label: "Mobile" },
    ];

    const { sortedHeaders, sortedItems, sortBy } = useSort(headers, items);

    const tableProps = {
        headers: sortedHeaders,
        items: sortedItems,
        sortBy,
        ...remainingProps,
    };

    return <ActionTable {...tableProps} />;
}
