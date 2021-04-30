//Imports
import { List, ListSubheader } from "@material-ui/core";
import MUIDrawer, { DrawerProps } from "@material-ui/core/Drawer";
import { Fragment, ReactElement } from "react";
//App Imports
import DrawerListItems, { DrawerCollection } from "./DrawerListItems";

export type DrawerMenuItem = DrawerCollection[];

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
        </MUIDrawer>
    );
}
