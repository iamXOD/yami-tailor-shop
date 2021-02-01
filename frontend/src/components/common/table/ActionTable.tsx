//UI Imports
import DetailIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Edit";

//App Imports
import Table from "./Table";
import IconButton from "../IconButton";

//Types
import { ReactElement } from "react";
import {
    Actionable, ActionType, TableHeader,
    CustomRender, Predicate
} from "../../../types";
type Props<T> = {
    headers: TableHeader<T>[],
    items: T[],
    customRender?: CustomRender<T>,
    filterPredicate?: Predicate<T>,
    onDetailButton: (item: T) => () => void,
    onDeleteButton: (item: T) => () => void,
    onUpdateButton: (item: T) => () => void,
};

export default function ActionTable<T>(props: Props<T>): ReactElement {
    const { headers, items, filterPredicate, customRender,
        onDetailButton, onDeleteButton, onUpdateButton } = props;

    const actionHeaders: TableHeader<T & Actionable>[] = [...headers,
    { name: "actions", isNonSortable: true, label: "Actions" }]

    const actionItems: (ActionType<T>)[] = items.map((item) => ({ ...item, actions: null }));

    const actions = (item: T): ReactElement => (<>
        <IconButton onClick={onDetailButton(item)} color="primary" Icon={DetailIcon} />
        <IconButton onClick={onUpdateButton(item)} color="primary" Icon={UpdateIcon} />
        <IconButton onClick={onDeleteButton(item)} color="primary" Icon={DeleteIcon} /></>);

    let actionCustomRender: CustomRender<ActionType<T>> = { ...customRender };
    actionCustomRender = { ...actionCustomRender, actions };

    const actionPredicate: Predicate<ActionType<T>> = (value, index, array) => {
        return filterPredicate ? filterPredicate(value, index, array) : false;
    }

    return <Table headers={actionHeaders} items={actionItems}
        customRender={actionCustomRender} filterPredicate={filterPredicate && actionPredicate} />
}