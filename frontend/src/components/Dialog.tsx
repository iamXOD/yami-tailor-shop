//Imports
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import MUIDialog from "@material-ui/core/Dialog";
import { ReactElement } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    Title?: ReactElement;
    Content: ReactElement;
    Actions?: ReactElement;
};

export function Dialog({
    Title,
    Content,
    Actions,
    ...props
}: Props): ReactElement {
    return (
        <MUIDialog {...props}>
            {Title && (
                <DialogTitle disableTypography={true}>{Title}</DialogTitle>
            )}
            <DialogContent>{Content}</DialogContent>
            {Actions && <DialogActions>{Actions}</DialogActions>}
        </MUIDialog>
    );
}

export default Dialog;