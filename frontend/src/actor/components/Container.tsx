//Imports
import { Container } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
//App Imports
import { Actor, actorURL, defaultActor } from "..";
import { ErrorCard, FabAddButton, Loading } from "../../components";
import {
    useAdd,
    useDelete,
    useGet,
    useList,
    useToggler,
    useUpdate,
} from "../../hooks";
import Delete from "./DeleteDialog";
import Detail from "./DetailDialog";
import Form from "./FormDialog";
import Table from "./Table";

export function ActorContainer(): ReactElement {
    const [actor, setActor] = useState<Actor>(defaultActor);
    const { loading, error, data: actors } = useList<Actor>(actorURL);

    const [detailState, openDetail, closeDetail] = useToggler();
    const get = useGet<Actor>(actorURL);
    const actorId = Number(useParams<{ actorId: string }>().actorId);
    useEffect(() => {
        if (actorId > 0) {
            get(actorId)
                .then(setActor)
                .catch(() => setActor(defaultActor))
                .finally(openDetail);
        }
    }, [actorId]);

    const [deleteState, openDelete, closeDelete] = useToggler();
    const del = useDelete(actorURL);

    const [formState, openForm, closeForm] = useToggler();
    const add = useAdd<Actor>(actorURL);
    const update = useUpdate<Actor>(actorURL);

    const tableProps = {
        items: actors,
        onDetailButton(actor: Actor) {
            return () => {
                setActor(actor);
                openDetail();
            };
        },
        onDeleteButton(actor: Actor) {
            return () => {
                setActor(actor);
                openDelete();
            };
        },
        onUpdateButton(actor: Actor) {
            return () => {
                setActor(actor);
                openForm();
            };
        },
    };

    const fabAddButtonProps = {
        color: "primary" as const,
        onAddButton() {
            setActor(defaultActor);
            openForm();
        },
    };
    const detailProps = {
        open: detailState,
        actor,
        onUpdate: openForm,
        onDelete: openDelete,
        onClose: closeDetail,
    };
    const deleteProps = {
        open: deleteState,
        actor,
        onClose: closeDelete,
        onConfirm: async () => {
            actor.id && (await del(actor.id));
        },
    };
    const formProps = {
        open: formState,
        actor,
        onClose: closeForm,
        onSubmit: async (actor: Actor) => {
            return actor.id ? await update(actor) : await add(actor);
        },
    };

    if (loading) {
        return <Loading text={"Fetching actors data"} />;
    }
    if (error) {
        return <ErrorCard error={error} />;
    }
    return (
        <Container maxWidth="md">
            <Table {...tableProps} />
            <FabAddButton {...fabAddButtonProps} />
            <Detail {...detailProps} />
            <Delete {...deleteProps} />
            <Form {...formProps} />
        </Container>
    );
}

export default ActorContainer;
