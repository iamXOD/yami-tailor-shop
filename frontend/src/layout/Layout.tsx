//Imports
import { makeStyles, Theme } from "@material-ui/core";
import { pick } from "lodash";
import { ReactElement, ReactNode, useState } from "react";
//App Imports
import { useUser } from "../user";
import AppBar from "./AppBar";
import { Drawer, DrawerMenuItem } from "./drawer";
import { UserButtonLogged, UserButtonLogin } from "./LogButton";

type Props = { drawerItems: DrawerMenuItem; children: ReactNode };

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

export function Layout({ drawerItems, children }: Props): ReactElement {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const RightButton = user ? <UserButtonLogged /> : <UserButtonLogin />;
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
                RightButton={RightButton}
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

export default Layout;
