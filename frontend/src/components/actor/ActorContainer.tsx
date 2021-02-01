//Imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//UI Imports
import { Container } from "@material-ui/core";

//App Imports
import Table from "./ActorTable";
import Delete from "./ActorDeleteDialog";
import Detail from "./ActorDetailDialog";
import Form from "./ActorFormDialog";
import AddButton from "../common/FabAddButton";
import Search from "../common/SearchField";

//Types
import { ReactElement } from "react";
import { Predicate, State } from "../../types";
import { Actor } from "../../store/models";

export const defActor: Actor = {
    id: -1,
    name: "",
    mobile_phone: "",
    home_phone: "",
    email: "",
    gender: "F"
};
export default function ActorContainer(): ReactElement {
    const actors = useSelector((state: State) => state.actor.actors);
    const [actor, setActor] =
        useState<Actor>(defActor);
    const [search, setSearch] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);

    const idFromURL = +useParams<{ id: string }>().id;
    const actorFromURL = actors.find(({ id }) => id === idFromURL);
    useEffect(() => {
        if (actorFromURL) {
            setActor(actorFromURL);
            setDetailDialogOpen(true);
        }
    }, [actorFromURL]);

    const filterPredicate: Predicate<Actor> = ({ name, mobile_phone, home_phone, email }) => {
        return !search ||
            name.toLowerCase().includes(search.toLowerCase()) ||
            home_phone?.toLowerCase().includes(search.toLowerCase()) ||
            email?.toLowerCase().includes(search.toLowerCase()) ||
            mobile_phone.toLowerCase().includes(search.toLowerCase())
    }

    const remainingProps = {
        setActor,
        filterPredicate,
        openDetailDialog: () => setDetailDialogOpen(true),
        openDeleteDialog: () => setDeleteDialogOpen(true),
        openFormDialog: () => setFormDialogOpen(true)
    }
    const onAddButton = () => {
        setActor(defActor);
        setFormDialogOpen(true);
    }

    return <Container maxWidth="md">
        <Search search={search} setSearch={setSearch} />
        <Table items={actors} {...remainingProps} />
        <AddButton onAddButton={onAddButton} color="primary" />
        <Detail open={detailDialogOpen} actor={actor}
            onUpdate={() => { setDetailDialogOpen(false); setFormDialogOpen(true) }}
            onDelete={() => setDeleteDialogOpen(true)}
            onClose={() => setDetailDialogOpen(false)} />
        <Form open={formDialogOpen} actor={actor}
            onClose={() => setFormDialogOpen(false)} />
        <Delete open={deleteDialogOpen} actor={actor}
            onClose={() => setDeleteDialogOpen(false)} />
    </Container>
}