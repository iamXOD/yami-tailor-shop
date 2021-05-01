//Imports
import { pick } from "lodash";
import { ReactElement } from "react";
import { useParams } from "react-router";
//App Imports
import { Actor } from "..";
import { Dialog, ErrorCard } from "../../components";
import { ActorCardActions, ActorCardContent, ActorCardTitle } from "./Detail";

type DetailProps = {
    open: boolean;
    actor: Actor;
    onClose: () => void;
    onUpdate: () => void;
    onDelete: () => void;
};

export function ActorDetailDialog(props: DetailProps): ReactElement {
    const { actor, open, onClose, ...actionsProps } = props;
    const actorId = Number(useParams<{ actorId: string }>().actorId);
    const isDefActor = !actor.id || actor.id === -1;

    const Title = isDefActor ? undefined : (
        <ActorCardTitle {...pick(actor, "name")} />
    );
    const Content = isDefActor ? (
        <ActorNotFoundError id={actorId} />
    ) : (
        <ActorCardContent
            {...pick(actor, ["mobile_phone", "home_phone", "email", "gender"])}
        />
    );
    const Actions = isDefActor ? undefined : (
        <ActorCardActions {...actionsProps} />
    );

    const dialogProps = {
        open,
        onClose,
        Title,
        Content,
        Actions,
    };

    return <Dialog {...dialogProps} />;
}

type NotFoundProps = { id: number };

export function ActorNotFoundError({ id }: NotFoundProps): ReactElement {
    const error = new Error(`Actor of id ${id} was not found`);
    error.name = "NotFoundError";
    return <ErrorCard error={error} />;
}

export default ActorDetailDialog;
