//Imports
import {
    Delete as DeleteIcon,
    Edit as UpdateIcon,
    Info as DetailsIcon,
} from "@material-ui/icons";
import { ReactElement } from "react";
//App Imports
import { IconButton } from "../components";
import { Table, TableProps } from "./Table";
import { CustomRender } from "./TableBodyRow";
import { TableHeader } from "./TableHeaderRow";

export type customRenderFn<T> = (item: T) => () => void;
type Actionable = { actions: null };
type ActionType<T> = T & Actionable;
type Props<T> = {
    onDetailButton: customRenderFn<T>;
    onDeleteButton: customRenderFn<T>;
    onUpdateButton: customRenderFn<T>;
} & TableProps<T>;

export function ActionTable<T>(props: Props<T>): ReactElement {
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
                Icon={DetailsIcon}
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

export default ActionTable;
