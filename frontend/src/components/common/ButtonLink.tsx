//Imports
import { Link, useHistory } from "react-router-dom";

//UI Imports
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import UpdateIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BackIcon from "@material-ui/icons/ArrowBack";

//Types
import { ReactElement } from "react";
import { ButtonLinkProps, IconButtonLinkProps } from "../../types";

export default function ButtonLink({ color, disabled, variant, text, to, Icon }: ButtonLinkProps): ReactElement {
    color = color || "primary";
    return text ? <Button color={color}
        disabled={disabled}
        variant={variant}
        component={Link} to={to}>
        {Icon && <Icon />} {text}
    </Button> :
        <IconButton color={color}
            disabled={disabled}
            component={Link} to={to}>
            {Icon && <Icon />}
        </IconButton>
}

export function InfoButtonLink(props: IconButtonLinkProps): ReactElement {
    return <ButtonLink Icon={InfoIcon} {...props} />
}

export function UpdateButtonLink(props: IconButtonLinkProps): ReactElement {
    return <ButtonLink Icon={UpdateIcon} {...props} />
}

export function DeleteButtonLink(props: IconButtonLinkProps): ReactElement {
    return <ButtonLink Icon={DeleteIcon}  {...props} />
}

export function BackButton({ text, color, variant, ...props }: Omit<IconButtonLinkProps, "to">): ReactElement {
    const history = useHistory();
    const onClickBack = () => history.goBack();
    color = color || "primary";
    return text ? <Button color={color}
        variant={variant}
        {...props}
        onClick={onClickBack}>
        <BackIcon /> {text}
    </Button> :
        <IconButton color={color} {...props}>
            <BackIcon />
        </IconButton>
}