//App Imports
import ConfirmDialog from "../common/ConfirmDialog";
import { useDelete } from "../../hooks/useDelete";
import { removeActor } from "../../store/actor/actions";

//Types
import { ReactElement } from "react";
import { Actor } from "../../store/models";
type Props = {
    open: boolean,
    onClose: () => void,
    actor: Actor
}

export default function ActorDeleteDialog({ open, actor, onClose }: Props): ReactElement {
    const deleteID = useDelete("actor/delete/", removeActor);
    const confirmDeleteDialog = () => {
        deleteID(actor.id);
        onClose();
    }

    return <ConfirmDialog
        open={open}
        title="Delete Actor"
        text={`Delete Actor: ${actor.name}?`}
        onCancel={onClose}
        onConfirm={confirmDeleteDialog} />
}