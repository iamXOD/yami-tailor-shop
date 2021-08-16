// Imports
import { AxiosError } from "axios";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
// App Imports
import { Actor, actorURL } from "..";
import { ActionTable, TableHeader, useSort } from "../../components";
import { useListQuery } from "../../hooks";

export function ActorTable(): ReactElement {
    const history = useHistory();
    const {
        isLoading,
        error,
        data = [],
    } = useListQuery<Actor, AxiosError>(actorURL);

    const headers: TableHeader<Actor>[] = [
        { name: "name", isActive: false, label: "Name" },
        { name: "mobile_phone", isActive: false, label: "Mobile" },
    ];

    const { sortedHeaders, sortedItems, sortBy } = useSort(headers, data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h2>{error.message}</h2>;
    }

    function onDetailButton(actor: Actor) {
        return () => history.push(`/actors/${actor.id}`);
    }
    function onDeleteButton(actor: Actor) {
        return () => history.push(`/actors/${actor.id}/delete`);
    }
    function onUpdateButton(actor: Actor) {
        return () => history.push(`/actors/${actor.id}/update`);
    }

    return (
        <ActionTable
            headers={sortedHeaders}
            items={sortedItems}
            sortBy={sortBy}
            onDetailButton={onDetailButton}
            onDeleteButton={onDeleteButton}
            onUpdateButton={onUpdateButton}
        />
    );
}
