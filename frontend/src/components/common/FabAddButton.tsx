//Imports
import { makeStyles } from "@material-ui/core";
import Fab, { FabProps } from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { ReactElement } from "react";

type Props = {
    onAddButton: () => void;
    color?: FabProps["color"];
    className?: FabProps["className"];
};

export default function FabAddButton({
    onAddButton,
    ...props
}: Props): ReactElement {
    const { fab } = makeStyles({
        fab: {
            margin: 0,
            top: "auto",
            left: "auto",
            bottom: 30,
            right: 30,
            position: "fixed",
        },
    })();
    return (
        <Fab className={fab} onClick={onAddButton} {...props}>
            <AddIcon />
        </Fab>
    );
}
