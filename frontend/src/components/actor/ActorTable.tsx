//App Imports
import ActionTable from '../common/table/ActionTable';

//Types
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Actor } from '../../store/models';
import { Predicate, TableHeader } from '../../types';
import { pick } from 'lodash';
type Props<T> = {
    items: T[],
    setActor: Dispatch<SetStateAction<T>>,
    filterPredicate: Predicate<T>,
    openDetailDialog: () => void,
    openDeleteDialog: () => void,
    openFormDialog: () => void,
}

export default function ActorTable(p: Props<Actor>): ReactElement {
    const { setActor, filterPredicate, items,
        openDetailDialog, openDeleteDialog, openFormDialog } = p;
    const headers: TableHeader<Actor>[] = [
        { name: "name", isActive: false, label: "Name" },
        { name: "mobile_phone", isActive: false, label: "Mobile" }
    ];

    const setAndCleanActor = (actor: Actor) => {
        setActor(pick(actor,
            ["id", "name", "mobile_phone", "home_phone", "email", "gender"]));
    }
    const onDeleteButton = (actor: Actor) => {
        return () => {
            setAndCleanActor(actor);
            openDeleteDialog();
        }
    }
    const onDetailButton = (actor: Actor) => {
        return () => {
            setAndCleanActor(actor);
            openDetailDialog();
        }
    }
    const onUpdateButton = (actor: Actor) => {
        return () => {
            setAndCleanActor(actor);
            openFormDialog();
        }
    }

    const remainingProps = {
        filterPredicate,
        onDetailButton,
        onDeleteButton,
        onUpdateButton
    }

    return <ActionTable headers={headers} items={items} {...remainingProps} />
}