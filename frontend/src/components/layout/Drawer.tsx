//Imports
import { List, ListSubheader } from "@material-ui/core";
import MUIDrawer, { DrawerProps } from "@material-ui/core/Drawer";
import { Fragment, ReactElement } from "react";
//App Imports
import { DrawerMenuItem } from "../../types";
import DrawerListItems from "./DrawerListItems";

type Props = {
    classes: Record<string, string>;
    items: DrawerMenuItem;
    variant?: DrawerProps["variant"];
    open?: boolean;
    onClose: { (title?: string): { (): void } };
};

export default function Drawer(props: Props): ReactElement {
    const { classes, items, onClose, open, variant } = props;

    return (
        <MUIDrawer open={open} variant={variant} onClose={onClose()}>
            <div className={classes.toolBarMargin}></div>
            <List>
                {items.map(({ name, items }, i) => {
                    return (
                        <Fragment key={i}>
                            {name && <ListSubheader>{name}</ListSubheader>}
                            <DrawerListItems
                                items={items}
                                onClick={onClose(name || "Yami Tailor Shop")}
                            />
                        </Fragment>
                    );
                })}
            </List>
            {/* <List>
            <ListSubheader>Actors</ListSubheader>
            <ListItem button={true} component={Link} to="/actors" onClick={onClose} >
                <ListItemText>List</ListItemText>
            </ListItem>
            <ListItem button={true} component={Link} to="/actors/add" onClick={onClose}>
                <ListItemText>Add</ListItemText>
            </ListItem>
        </List> */}
        </MUIDrawer>
    );
}
