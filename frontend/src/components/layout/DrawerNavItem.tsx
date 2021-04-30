//Imports
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
//App Imports
import { TODO } from "../../types";

export interface DrawerItem {
    label: string;
    Icon?: TODO;
    url: string;
    hidden?: boolean;
    disabled?: boolean;
}

type Props = { item: DrawerItem; onClick: { (): void } };

export default function DrawerNavItem({ item, onClick }: Props): ReactElement {
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
}
