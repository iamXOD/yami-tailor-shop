//Imports
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Edit";
import { ReactElement, Reducer, useEffect, useReducer } from "react";
//App Imports
import useAdd from "../../hooks/useAdd";
import useUpdate from "../../hooks/useUpdate";
import { addActor, updateActor } from "../../store/actor/actions";
import { Actor } from "../../store/models";
import Dialog from "../common/Dialog";
import { defActor } from "./ActorContainer";
import ActorForm from "./ActorForm";

type Props = {
    open: boolean;
    onClose: () => void;
    actor: Actor;
};

export default function ActorFormDialog({
    open,
    onClose,
    actor,
}: Props): ReactElement {
    const [newActor, setNewActor] = useReducer<Reducer<Actor, Partial<Actor>>>(
        (oldState, newState) => ({ ...oldState, ...newState }),
        actor
    );

    const createActor = useAdd("actors", addActor);
    const modifyActor = useUpdate("actors", updateActor);

    const isDefActor = actor.id === -1;
    const title = isDefActor ? "Add" : "Update";
    const Icon = isDefActor ? AddIcon : UpdateIcon;
    const action = isDefActor ? createActor : modifyActor;

    const onSubmit = async () => {
        await action(newActor);
        setNewActor(defActor);
    };

    const onSubmitAndClose = async () => {
        await onSubmit();
        onClose();
    };
    const onCancel = () => {
        setNewActor(defActor);
        onClose();
    };

    useEffect(() => {
        setNewActor(actor);
    }, [actor]);

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            Title={<Typography variant="h4">{title}</Typography>}
            Content={<ActorForm actor={newActor} setActor={setNewActor} />}
            Actions={
                <>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        onClick={onSubmitAndClose}
                        disabled={!newActor.name || !newActor.mobile_phone}
                        variant="contained"
                        color="primary">
                        <Icon />
                        {title}
                    </Button>
                    {isDefActor && (
                        <Button
                            onClick={onSubmit}
                            disabled={!newActor.name || !newActor.mobile_phone}
                            variant="contained"
                            color="primary">
                            <Icon />
                            Add and Continue
                        </Button>
                    )}
                </>
            }
        />
    );
}
