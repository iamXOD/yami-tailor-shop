//Imports
import { Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Edit";
import { ReactElement } from "react";
//App Imports
import { Actor } from "../../store/models";
import Dialog from "../common/Dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    actor: Actor;
    onUpdate: () => void;
    onDelete: () => void;
};

export default function ActorDetailDialog({
    actor,
    onUpdate,
    onDelete,
    ...props
}: Props): ReactElement {
    const { name, mobile_phone, home_phone, email, gender } = actor;

    const match = name.match(/([^ ]+)( (.+))?/);
    const first = match?.[1],
        rest = match?.[3];

    return (
        <Dialog
            {...props}
            Title={
                <>
                    <Typography variant="h4">{first || name}</Typography>
                    {rest && <Typography variant="body2">{rest}</Typography>}
                </>
            }
            Content={
                <>
                    <Typography variant="body1">
                        Mobile: {mobile_phone}
                    </Typography>
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
            }
            Actions={
                <>
                    <Button
                        onClick={onUpdate}
                        variant="contained"
                        color="primary">
                        <UpdateIcon /> Update
                    </Button>
                    <Button
                        onClick={onDelete}
                        variant="contained"
                        color="primary">
                        <DeleteIcon /> Delete
                    </Button>
                </>
            }
        />
    );
}
