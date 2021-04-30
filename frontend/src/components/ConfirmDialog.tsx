//Imports
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import MUIDialog from "@material-ui/core/Dialog";
import { ReactElement } from "react";

type Props = {
    open: boolean;
    title?: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    text,
    onCancel,
    onConfirm,
}: Props): ReactElement {
    return (
        <MUIDialog
            open={open}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth="md">
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </MUIDialog>
    );
}

export default ConfirmDialog;
