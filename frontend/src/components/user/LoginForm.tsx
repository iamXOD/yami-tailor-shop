//Imports
import { useState } from "react";

//UI Imports
import {
    Container, Typography, TextField,
    Button, InputAdornment, IconButton, makeStyles, Theme, Avatar
} from "@material-ui/core";
import VisibleIcon from "@material-ui/icons/VisibilityOutlined";
import NotVisibleIcon from "@material-ui/icons/VisibilityOffOutlined";
import LockIcon from "@material-ui/icons/Lock";

//App Imports
import { Item } from "../common/Grid";
import useInput from "../../hooks/useInput";
import { returnsInputProps } from "../../util";

//Types
import { ReactElement } from "react";
type Props = { onSubmit: (username: string, password: string) => void }

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
    paper: {
        marginTop: spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: spacing(1),
        backgroundColor: palette.secondary.main,
    },
    loginButton: {
        margin: spacing(3, 0, 2),
    },
}))

export default function LoginForm({ onSubmit }: Props): ReactElement {
    const [isVisible, setVisible] = useState(false);
    const toggleVisibility = () => setVisible((prev) => !prev);

    const [usernameProps] = useInput("");
    const [passwordProps] = useInput("");

    function submit() {
        onSubmit(usernameProps.value, passwordProps.value);
    }

    const { paper, avatar, loginButton } = useStyles();
    return <Container maxWidth="xs" className={paper}>
        <Avatar className={avatar}>
            <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">Login</Typography>
        <Item xs={12}>
            <TextField type="text" fullWidth={true}
                margin="normal"
                {...returnsInputProps("username")}
                {...usernameProps} />
            <TextField type={isVisible ? "text" : "password"} fullWidth={true}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"
                            onClick={toggleVisibility}>
                            <IconButton>
                                {isVisible ? <VisibleIcon /> : <NotVisibleIcon />}
                            </IconButton>
                        </InputAdornment>)
                }}
                margin="normal"
                {...returnsInputProps("password")}
                {...passwordProps} />
        </Item>
        <Item xs={12} >
            <Button type="button" onClick={submit}
                className={loginButton}
                variant="contained" color="primary">
                Login
            </Button>
        </Item>
    </Container >
}