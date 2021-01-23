//Imports
import React, { useState } from "react";

//UI Imports
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

type Props = { error: Error | null, onSubmit: { (username: string, password: string): void } }

const LoginForm: React.VFC<Props> = (props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { error } = props;
    return <section>
        <h2>Login</h2>
        {error ? <p>{error.message}</p> : null}
        <form>
            <TextField
                name="username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                floatingLabelText="Username" fullWidth={true}
            />
            <TextField
                name="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                floatingLabelText="Password"
            />
            <RaisedButton
                label="Submit"
                type="button"
                onClick={() => props.onSubmit(username, password)}
            />
        </form>
    </section>
}

export default LoginForm;