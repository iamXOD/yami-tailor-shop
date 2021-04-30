//Imports
import { ReactElement } from "react";
//App Imports
import { ConfirmDialog } from "../../components";
import { useDelete } from "../../hooks";
import { Actor, removeActor } from "../store";

type Props = {
    open: boolean;
    onClose: () => void;
    actor: Actor;
};

export default function ActorDeleteDialog({
    open,
    actor,
    onClose,
}: Props): ReactElement {
    const del = useDelete("actors", removeActor);
    const confirmDeleteDialog = async () => {
        actor.id && (await del(actor.id));
        onClose();
    };

    return (
        <ConfirmDialog
            open={open}
            title="Delete Actor"
            text={`Delete Actor: ${actor.name}?`}
            onCancel={onClose}
            onConfirm={confirmDeleteDialog}
        />
    );
}
