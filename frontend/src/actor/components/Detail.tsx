//Imports
import { Button, Typography } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { ReactElement } from "react";
//App Imports
import { Actor } from "..";

type ContentProps = Pick<
    Actor,
    "mobile_phone" | "home_phone" | "email" | "gender"
>;
export function ActorCardContent(props: ContentProps): ReactElement {
    const { mobile_phone, home_phone, email, gender } = props;
    return (
        <>
            <Typography variant="body1">Mobile: {mobile_phone}</Typography>
            <Typography variant="body1">
                {home_phone && `Home: ${home_phone}`}
            </Typography>
            <Typography variant="body1">
                {email && `Email: ${email}`}
            </Typography>
            <Typography variant="body1">
                Gender: {gender === "F" ? "Female" : "Male"}
            </Typography>
        </>
    );
}

type TitleProps = Pick<Actor, "name">;
export function ActorCardTitle({ name }: TitleProps): ReactElement {
    const nameDividerRegexp = /([^ ]+)( (.+))?/;
    const match = name.match(nameDividerRegexp);
    const first = match?.[1];
    const rest = match?.[3];

    return (
        <>
            <Typography variant="h4">{first || name}</Typography>
            {rest && <Typography variant="body2">{rest}</Typography>}
        </>
    );
}

type ActionProps = { onUpdate: () => void; onDelete: () => void };
export function ActorCardActions(props: ActionProps): ReactElement {
    const { onUpdate, onDelete } = props;
    return (
        <>
            <Button onClick={onUpdate} variant="contained" color="primary">
                <EditIcon /> Update
            </Button>
            <Button onClick={onDelete} variant="contained" color="primary">
                <DeleteIcon /> Delete
            </Button>
        </>
    );
}
