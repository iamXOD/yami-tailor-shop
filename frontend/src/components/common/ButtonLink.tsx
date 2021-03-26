//Imports
import Button, { ButtonProps } from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
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
