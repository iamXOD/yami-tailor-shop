//Imports
import { Fab, FabProps, makeStyles } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { ReactElement } from "react";

type Props = {
    onAddButton: () => void;
    color?: FabProps["color"];
    className?: FabProps["className"];
};

export function FabAddButton({ onAddButton, ...props }: Props): ReactElement {
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

export default FabAddButton;
