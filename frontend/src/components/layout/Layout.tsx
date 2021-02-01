//Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { pick } from "lodash";

//UI Imports
import { makeStyles } from "@material-ui/core/styles";

//App Imports
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import UserButtonLogged from "../user/button/LoggedButton";
import UserButtonLogin from "../user/button/LoginButton";

//Types
import { ReactElement, ReactNode } from "react";
import { Theme } from "@material-ui/core/styles";
import { DrawerMenuItem, State } from "../../types";
type Props = { drawerItems: DrawerMenuItem, children: ReactNode };

const useStyles = makeStyles(({ zIndex, mixins }: Theme) => ({
    appBar: {
        zIndex: zIndex.modal + 1
    },
    menuButton: {
        marginLeft: -10,
        marginRight: 20
    },
    logoLink: {
        textDecoration: "none",
        color: "inherit"
    },
    loginButton: {
        marginLeft: "auto"
    },
    toolBarMargin: mixins.toolbar
}));

export default function Layout({ drawerItems, children }: Props): ReactElement {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useSelector((state: State) => state.user);
    const RightButton = isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin />
    const [title, setTitle] = useState<string>("Yami Tailor Shop");
    const close = (title?: string) => () => { setOpen(false); title && setTitle(title) };
    const toggle = () => setOpen(prevValue => !prevValue);

    return <>
        <AppBar title={title} classes={classes} onMenuClick={toggle} position="fixed" RightButton={RightButton} />
        <Drawer open={open} onClose={close} classes={pick(classes, "toolBarMargin")} items={drawerItems} />
        {children}
    </>
}