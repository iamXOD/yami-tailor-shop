//Imports
import { pick } from "lodash";
import { Dispatch, ReactElement, SetStateAction } from "react";
//App Imports
import { Actor } from "../../store/models";
import { TableHeader } from "../../types";
import ActionTable from "../common/table/ActionTable";

type Props<T> = {
    items: T[];
    setActor: Dispatch<SetStateAction<T>>;
    openDetailDialog: () => void;
    openDeleteDialog: () => void;
    openFormDialog: () => void;
};

export default function ActorTable(p: Props<Actor>): ReactElement {
    const {
        setActor,
        items,
        openDetailDialog,
        openDeleteDialog,
        openFormDialog,
    } = p;
    const headers: TableHeader<Actor>[] = [
        { name: "name", isActive: false, label: "Name" },
        { name: "mobile_phone", isActive: false, label: "Mobile" },
    ];

    const setAndCleanActor = (actor: Actor) => {
        setActor(
            pick(actor, [
                "name",
                "mobile_phone",
                "home_phone",
                "email",
                "gender",
            ])
        );
    };

    const tableProps = {
        headers,
        items,
        onDeleteButton(actor: Actor) {
            return () => {
                setAndCleanActor(actor);
                openDeleteDialog();
            };
        },
        onDetailButton(actor: Actor) {
            return () => {
                setAndCleanActor(actor);
                openDetailDialog();
            };
        },
        onUpdateButton(actor: Actor) {
            return () => {
                setAndCleanActor(actor);
                openFormDialog();
            };
        },
    };

    return <ActionTable {...tableProps} />;
}
