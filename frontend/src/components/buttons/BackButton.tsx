//Imports
import { Button, ButtonProps, IconButton } from "@material-ui/core";
import { ArrowBack as BackIcon } from "@material-ui/icons";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";

type Props = {
    className?: string;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    disabled?: boolean;
    text?: string;
};

export function BackButton({
    text,
    color,
    variant,
    ...props
}: Props): ReactElement {
    const history = useHistory();
    const onClickBack = () => history.goBack();
    color = color || "primary";
    return text ? (
        <Button
            color={color}
            variant={variant}
            {...props}
            onClick={onClickBack}>
            <BackIcon /> {text}
        </Button>
    ) : (
        <IconButton color={color} {...props}>
            <BackIcon />
        </IconButton>
    );
}

export default BackButton;
