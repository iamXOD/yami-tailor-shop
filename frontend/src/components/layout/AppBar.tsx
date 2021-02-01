//Imports
import { Link } from "react-router-dom";

//UI Imports
import MUIAppBar from "@material-ui/core/AppBar";
import { IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

//Types
import { ReactElement } from "react";
import { AppBarProps } from "@material-ui/core/AppBar"
type Props = {
    position?: AppBarProps["position"],
    title: string
    classes: Record<string, string>,
    onMenuClick: { (): void },
    RightButton: ReactElement
}

export default function AppBar({ position, classes, onMenuClick, title, RightButton }: Props): ReactElement {
    const { appBar, menuButton, logoLink, loginButton, toolBarMargin } = classes;    

    return <>
        <MUIAppBar position={position} className={appBar}>
            <Toolbar>
                <IconButton className={menuButton}
                    onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5">
                    <Link to="/" className={logoLink} >
                        {title}
                    </Link>
                </Typography>
                <div className={loginButton}>
                    {RightButton}
                </div>
            </Toolbar>
        </MUIAppBar>
        <div className={toolBarMargin}></div>
    </>
}