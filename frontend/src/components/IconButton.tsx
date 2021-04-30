//Imports
import MUIIconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { ReactElement } from "react";
//App Imports
import { TODO } from "../types";

type Props = {
    Icon: TODO;
    onClick: () => void;
    color?: IconButtonProps["color"];
    text?: string;
};

export function IconButton({
    Icon,
    onClick,
    text,
    ...props
}: Props): ReactElement {
    return (
        <MUIIconButton onClick={onClick} {...props}>
            <Icon /> {text}
        </MUIIconButton>
    );
}

export default IconButton;
