//Imports
import {
    Avatar,
    Button,
    Container,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import {
    Lock as LockIcon,
    VisibilityOffOutlined as NotVisibleIcon,
    VisibilityOutlined as VisibleIcon,
} from "@material-ui/icons";
import { ReactElement, useState } from "react";
//App Imports
import { LoginPayload } from "..";
import { Item } from "../../components";
import { useInput } from "../../hooks";

type Props = { onSubmit: (user: LoginPayload) => void };

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
    paper: {
        marginTop: spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: spacing(1),
        backgroundColor: palette.secondary.main,
    },
    loginButton: {
        margin: spacing(3, 0, 2),
    },
}));

export default function LoginForm({ onSubmit }: Props): ReactElement {
    const [isVisible, setVisible] = useState(false);
    const toggleVisibility = () => setVisible((prev) => !prev);

    const [usernameProps] = useInput("");
    const [passwordProps] = useInput("");

    const { paper, avatar, loginButton } = useStyles();
    return (
        <Container maxWidth="xs" className={paper}>
            <Avatar className={avatar}>
                <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
                Login
            </Typography>
            <Item xs={12}>
                <TextField
                    type="text"
                    fullWidth={true}
                    margin="normal"
                    {...returnsInputProps("username")}
                    {...usernameProps}
                />
                <TextField
                    type={isVisible ? "text" : "password"}
                    fullWidth={true}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                onClick={toggleVisibility}>
                                <IconButton>
                                    {isVisible ? (
                                        <VisibleIcon />
                                    ) : (
                                        <NotVisibleIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    {...returnsInputProps("password")}
                    {...passwordProps}
                />
            </Item>
            <Item xs={12}>
                <Button
                    type="button"
                    onClick={() =>
                        onSubmit({
                            username: usernameProps.value,
                            password: passwordProps.value,
                        })
                    }
                    className={loginButton}
                    variant="contained"
                    color="primary">
                    Login
                </Button>
            </Item>
        </Container>
    );
}

function returnsInputProps(
    name: string
): Record<"id" | "name" | "label", string> {
    return {
        id: name,
        name,
        label: name.charAt(0).toUpperCase().concat(name.slice(1)),
    };
}
