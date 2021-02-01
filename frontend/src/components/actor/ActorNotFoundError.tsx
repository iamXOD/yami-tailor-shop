//App Imports
import ErrorCard from "../common/ErrorCard";

//Types
import { ReactElement } from "react";
type Props = { id: number };

export default function ActorNotFoundError({ id }: Props): ReactElement {
    const error = new Error(`Actor of id ${id} was not found`);
    error.name = "NotFoundError";
    return <ErrorCard error={error} />
}