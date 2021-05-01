//Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import { pick } from "lodash";
import { ReactElement, ReactNode, useState } from "react";
import { useSelector } from "react-redux";
//App Imports
import { State } from "../store";
import AppBar from "./AppBar";
import UserButtonLogged from "./button/LoggedButton";
import UserButtonLogin from "./button/LoginButton";
import { Drawer, DrawerMenuItem } from "./drawer";

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
    const { isAuthenticated } = useSelector((state: State) => state.user);
    const RightButton = isAuthenticated ? (
        <UserButtonLogged />
    ) : (
        <UserButtonLogin />
    );
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