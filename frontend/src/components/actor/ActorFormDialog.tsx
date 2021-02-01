//Imports
import { useEffect, useReducer } from "react";

//UI Imports
import { Button, Typography } from '@material-ui/core';
import UpdateIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

//App Imports
import ActorForm from "./ActorForm";
import Dialog from '../common/Dialog';
import useUpdate from "../../hooks/useUpdate";
import useAdd from "../../hooks/useAdd";
import { addActor, updateActor } from "../../store/actor/actions";

//Types
import { ReactElement, Reducer } from 'react';
import { Actor } from '../../store/models';
import { defActor } from "./ActorContainer";
type Props = {
    open: boolean,
    onClose: () => void,
    actor: Actor
}

export default function ActorFormDialog({ open, onClose, actor }: Props): ReactElement {
    const [newActor, setNewActor] =
        useReducer<Reducer<Actor, Partial<Actor>>>(
            (oldState, newState) => ({ ...oldState, ...newState }),
            actor);

    const [createActor] = useAdd("actor/add", addActor);
    const [modifyActor] = useUpdate(`actor/update`, updateActor);

    const isDefActor = actor.id === -1;
    const title = isDefActor ? "Add" : "Update";
    const Icon = isDefActor ? AddIcon : UpdateIcon;
    const action = isDefActor ? createActor : modifyActor;

    const onSubmit = () => {
        action(newActor);
        setNewActor(defActor);
    };

    const onSubmitAndClose = () => {
        onSubmit();
        onClose();
    }
    const onCancel = () => {
        setNewActor(defActor);
        onClose();
    }

    useEffect(() => {
        setNewActor(actor);
    }, [actor]);

    return <Dialog open={open} onClose={onCancel}
        Title={<Typography variant="h4">{title}</Typography>}
        Content={<ActorForm actor={newActor} setActor={setNewActor} />}
        Actions={<>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSubmitAndClose}
                disabled={!newActor.name || !newActor.mobile_phone}
                variant="contained" color="primary">
                <Icon />{title}
            </Button>
            {isDefActor &&
                <Button onClick={onSubmit}
                    disabled={!newActor.name || !newActor.mobile_phone}
                    variant="contained" color="primary">
                    <Icon />Add and Continue
                </Button>
            }
        </>
        }
    />
}