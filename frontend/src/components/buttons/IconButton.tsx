//Imports
import {
    IconButton as MUIIconButton,
    IconButtonProps,
    SvgIconProps,
} from "@material-ui/core";
import { ComponentType, ReactElement } from "react";

type Props = {
    Icon: ComponentType<SvgIconProps>;
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
