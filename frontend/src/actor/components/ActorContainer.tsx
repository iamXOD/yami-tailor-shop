//Imports
import { Container } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//App Imports
import { FabAddButton as AddButton, SearchField } from "../../components";
import { Predicate, useFilter, useToggler } from "../../hooks";
import { State } from "../../store";
import { Actor } from "../store/";
import Delete from "./ActorDeleteDialog";
import Detail from "./ActorDetailDialog";
import Form from "./ActorFormDialog";
import Table from "./ActorTable";

export const defActor: Actor = {
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

    const [deleteState, openDelete, closeDelete] = useToggler();
    const [detailState, openDetail, closeDetail] = useToggler();
    const [formState, openForm, closeForm] = useToggler();

    const idFromURL = +useParams<{ id: string }>().id;
    const actorFromURL = actors.find(({ id }) => id === idFromURL);
    useEffect(() => {
        if (actorFromURL) {
            setActor(actorFromURL);
            openDetail();
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
        openDetailDialog: openDetail,
        openDeleteDialog: openDelete,
        openFormDialog: openForm,
    };
    const onAddButton = () => {
        setActor(defActor);
        openForm();
    };

    const detailProps = {
        open: detailState,
        actor,
        onUpdate: () => {
            closeDetail();
            openForm();
        },
        onDelete: openDelete,
        onClose: closeDetail,
    };

    return (
        <Container maxWidth="md">
            <SearchField search={search} setSearch={setSearch} />
            <Table {...tableProps} />
            <AddButton onAddButton={onAddButton} color="primary" />
            <Detail {...detailProps} />
            <Form open={formState} actor={actor} onClose={closeForm} />
            <Delete open={deleteState} actor={actor} onClose={closeDelete} />
        </Container>
    );
}
