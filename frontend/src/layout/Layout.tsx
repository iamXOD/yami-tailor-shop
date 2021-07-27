// Imports
import { makeStyles, Theme } from "@material-ui/core";
import { pick } from "lodash";
import { ReactElement, ReactNode, useState } from "react";
// App Imports
import { AppBar } from "./AppBar";
import { Drawer, DrawerMenuItem } from "./drawer";

type Props = {
    drawerItems: DrawerMenuItem;
    children: ReactNode;
    LogButton: ReactElement;
};

const useStyles = makeStyles(({ zIndex, mixins }: Theme) => ({
    appBar: {
        zIndex: zIndex.modal + 1,
    },
    menuButton: {
        marginLeft: -10,
        marginRight: 20,
    },
    logoLink: {
        textDecoration: "none",
        color: "inherit",
    },
    loginButton: {
        marginLeft: "auto",
    },
    toolBarMargin: mixins.toolbar,
}));

export function Layout({
    drawerItems,
    children,
    LogButton,
}: Props): ReactElement {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("Yami Tailor Shop");
    const close = (title?: string) => () => {
        setOpen(false);
        title && setTitle(title);
    };
    const toggle = () => setOpen((prevValue) => !prevValue);

    return (
        <>
            <AppBar
                title={title}
                classes={classes}
                onMenuClick={toggle}
                position="fixed"
                RightButton={LogButton}
            />
            <Drawer
                open={open}
                onClose={close}
                classes={pick(classes, "toolBarMargin")}
                items={drawerItems}
            />
            {children}
        </>
    );
}
