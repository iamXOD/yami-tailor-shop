//UI Imports
import MUIIconButton from "@material-ui/core/IconButton";
import { IconButtonProps } from "@material-ui/core/IconButton"

//Types
import { ReactElement } from "react";
import { TODO } from "../../types";
type Props = {
    Icon: TODO,
    onClick: () => void,
    color?: IconButtonProps["color"],
    text?: string
}

export default function IconButton({ Icon, onClick, text, ...props }: Props): ReactElement {
    return <MUIIconButton onClick={onClick} {...props}><Icon /> {text}</MUIIconButton>
}