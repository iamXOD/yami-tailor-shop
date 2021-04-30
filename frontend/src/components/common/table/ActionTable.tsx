//Imports
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Edit";
import DetailIcon from "@material-ui/icons/Info";
import { ReactElement } from "react";
//App Imports
import IconButton from "../IconButton";
import Table, { TableProps } from "./Table";
import { CustomRender } from "./TableBodyRow";
import { TableHeader } from "./TableHeaderRow";

export type Actionable = { actions: null };
export type ActionType<T> = T & Actionable;
type Props<T> = {
    onDetailButton: (item: T) => () => void;
    onDeleteButton: (item: T) => () => void;
    onUpdateButton: (item: T) => () => void;
} & TableProps<T>;

export default function ActionTable<T>(props: Props<T>): ReactElement {
    const {
        headers,
        items,
        customRender,
        onDetailButton,
        onDeleteButton,
        onUpdateButton,
        ...remainingProps
    } = props;

    const actionHeaders: TableHeader<T & Actionable>[] = [
        ...headers,
        { name: "actions", isNonSortable: true, label: "Actions" },
    ];

    const actionItems: ActionType<T>[] = items.map((item) => ({
        ...item,
        actions: null,
    }));

    const actions = (item: T): ReactElement => (
        <>
            <IconButton
                onClick={onDetailButton(item)}
                color="primary"
                Icon={DetailIcon}
            />
            <IconButton
                onClick={onUpdateButton(item)}
                color="primary"
                Icon={UpdateIcon}
            />
            <IconButton
                onClick={onDeleteButton(item)}
                color="primary"
                Icon={DeleteIcon}
            />
        </>
    );

    let actionCustomRender: CustomRender<ActionType<T>> = { ...customRender };
    actionCustomRender = { ...actionCustomRender, actions };

    return (
        <Table
            headers={actionHeaders}
            items={actionItems}
            customRender={actionCustomRender}
            {...remainingProps}
        />
    );
}
