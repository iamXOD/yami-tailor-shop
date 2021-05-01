//Imports
import { ReactElement } from "react";
//App Imports
import { Actor } from "..";
import { ConfirmDialog } from "../../components";

interface Props {
    open: boolean;
    actor: Actor;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ActorDeleteDialog(props: Props): ReactElement {
    const { open, actor, onClose, onConfirm } = props;
    return (
        <ConfirmDialog
            open={open}
            title="Delete Actor"
            text={`Delete Actor: ${actor.name}?`}
            onCancel={onClose}
            onConfirm={() => {
                onConfirm();
                onClose();
            }}
        />
    );
}
