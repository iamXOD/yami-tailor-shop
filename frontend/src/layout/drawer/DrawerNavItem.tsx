//Imports
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    SvgIconProps,
} from "@material-ui/core";
import { ComponentType, ReactElement } from "react";
import { Link } from "react-router-dom";

export interface DrawerItem {
    label: string;
    Icon?: ComponentType<SvgIconProps>;
    url: string;
    hidden?: boolean;
    disabled?: boolean;
}

type Props = { item: DrawerItem; onClick: () => void };

export const DrawerNavItem = ({ item, onClick }: Props): ReactElement => {
    const { label, url, disabled, Icon } = item;
    return (
        <ListItem
            button={true}
            component={Link}
            to={url}
            disabled={disabled}
            onClick={onClick}>
            {Icon && (
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText>{label}</ListItemText>
        </ListItem>
    );
};
