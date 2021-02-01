//Imports
import { Link } from "react-router-dom";

//UI Imports
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

//App Imports
import { DrawerItem } from "../../types";

//Types
import { ReactElement } from "react";
type Props = { item: DrawerItem, onClick: { (): void } }

export default function DrawerNavItem({ item, onClick }: Props): ReactElement {
    const { label, url, disabled, Icon } = item;
    return <ListItem button={true}
        component={Link}
        to={url}
        disabled={disabled}
        onClick={onClick}>
        {Icon && <ListItemIcon><Icon /></ListItemIcon>}
        <ListItemText>{label}</ListItemText>
    </ListItem>

}