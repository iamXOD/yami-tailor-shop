//Imports
import { IconButton, Toolbar, Typography } from "@material-ui/core";
import MUIAppBar, { AppBarProps } from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type Props = {
    position?: AppBarProps["position"];
    title: string;
    classes: Record<string, string>;
    onMenuClick: { (): void };
    RightButton: ReactElement;
};

export default function AppBar({
    position,
    classes,
    onMenuClick,
    title,
    RightButton,
}: Props): ReactElement {
    const {
        appBar,
        menuButton,
        logoLink,
        loginButton,
        toolBarMargin,
    } = classes;

    return (
        <>
            <MUIAppBar position={position} className={appBar}>
                <Toolbar>
                    <IconButton className={menuButton} onClick={onMenuClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5">
                        <Link to="/" className={logoLink}>
                            {title}
                        </Link>
                    </Typography>
                    <div className={loginButton}>{RightButton}</div>
                </Toolbar>
            </MUIAppBar>
            <div className={toolBarMargin}></div>
        </>
    );
}
