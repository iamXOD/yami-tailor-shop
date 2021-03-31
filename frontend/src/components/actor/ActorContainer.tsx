//Imports
import { Container } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//App Imports
import useFilter from "../../hooks/useFilter";
import { Actor } from "../../store/models";
import { Predicate, State } from "../../types";
import AddButton from "../common/FabAddButton";
import Search from "../common/SearchField";
import Delete from "./ActorDeleteDialog";
import Detail from "./ActorDetailDialog";
import Form from "./ActorFormDialog";
import Table from "./ActorTable";

export const defActor: Actor = {
    id: -1,
    name: "",
    mobile_phone: "",
    home_phone: "",
    email: "",
    gender: "F",
};
export default function ActorContainer(): ReactElement {
    const actors = useSelector((state: State) => state.actor.actors);
    const [actor, setActor] = useState<Actor>(defActor);
    const [filteredItems, search, setSearch] = useFilter(actors, filter);
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

    function filter(search: string): Predicate<Actor> {
        return ({ name, mobile_phone, home_phone, email }) => {
            const lowerCaseSearch = search.toLowerCase();
            return (
                !search ||
                name.toLowerCase().includes(lowerCaseSearch) ||
                home_phone?.toLowerCase().includes(lowerCaseSearch) ||
                email?.toLowerCase().includes(lowerCaseSearch) ||
                mobile_phone.toLowerCase().includes(lowerCaseSearch)
            );
        };
    }

    const tableProps = {
        setActor,
        items: filteredItems,
        openDetailDialog: () => setDetailDialogOpen(true),
        openDeleteDialog: () => setDeleteDialogOpen(true),
        openFormDialog: () => setFormDialogOpen(true),
    };
    const onAddButton = () => {
        setActor(defActor);
        setFormDialogOpen(true);
    };

    return (
        <Container maxWidth="md">
            <Search search={search} setSearch={setSearch} />
            <Table {...tableProps} />
            <AddButton onAddButton={onAddButton} color="primary" />
            <Detail
                open={detailDialogOpen}
                actor={actor}
                onUpdate={() => {
                    setDetailDialogOpen(false);
                    setFormDialogOpen(true);
                }}
                onDelete={() => setDeleteDialogOpen(true)}
                onClose={() => setDetailDialogOpen(false)}
            />
            <Form
                open={formDialogOpen}
                actor={actor}
                onClose={() => setFormDialogOpen(false)}
            />
            <Delete
                open={deleteDialogOpen}
                actor={actor}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </Container>
    );
}
