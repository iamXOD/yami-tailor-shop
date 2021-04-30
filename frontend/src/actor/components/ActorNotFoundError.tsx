//Imports
import { ReactElement } from "react";
//App Imports
import { ErrorCard } from "../../components";

type Props = { id: number };

export default function ActorNotFoundError({ id }: Props): ReactElement {
    const error = new Error(`Actor of id ${id} was not found`);
    error.name = "NotFoundError";
    return <ErrorCard error={error} />;
}
