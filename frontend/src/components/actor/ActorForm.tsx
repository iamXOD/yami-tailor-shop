//Imports
import { TextField } from "@material-ui/core";
import MUIContainer from "@material-ui/core/Container";
import { ChangeEvent, Dispatch, ReactElement } from "react";
//App Imports
import { Actor } from "../../store/models";
import { RadioButtonOption } from "../../types";
import { returnsInputProps } from "../../util";
import { Container, Item } from "../common/Grid";
import RadioGroup from "../common/RadioGroup";

type Props = {
    actor: Actor;
    setActor: Dispatch<Partial<Actor>>;
};

export default function ActorForm({ actor, setActor }: Props): ReactElement {
    const { name, mobile_phone, home_phone, email, gender } = actor;

    const genderOptions: RadioButtonOption<Actor["gender"]>[] = [
        { label: "Female", value: "F" },
        { label: "Male", value: "M" },
    ];

    function set(prop: keyof Actor) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setActor({ [prop]: e.target.value });
        };
    }

    return (
        <MUIContainer maxWidth="md">
            <Container spacing={1}>
                <Item xs={12}>
                    <TextField
                        {...returnsInputProps("name")}
                        placeholder="Yami"
                        autoFocus={true}
                        required={true}
                        fullWidth={true}
                        value={name}
                        onChange={set("name")}
                    />
                </Item>
                <Item xs={12} sm={6}>
                    <TextField
                        {...returnsInputProps("mobile")}
                        placeholder="5 x xxxxxx"
                        type="number"
                        required={true}
                        fullWidth={true}
                        value={mobile_phone}
                        onChange={set("mobile_phone")}
                    />
                </Item>
                <Item xs={12} sm={6}>
                    <TextField
                        {...returnsInputProps("home")}
                        placeholder="7 xxx xxxx"
                        type="number"
                        fullWidth={true}
                        value={home_phone}
                        onChange={set("home_phone")}
                    />
                </Item>
                <Item xs={12}>
                    <TextField
                        {...returnsInputProps("email")}
                        placeholder="example@server.tld"
                        type="email"
                        fullWidth={true}
                        value={email}
                        onChange={set("email")}
                    />
                </Item>
                <Item xs={12}>
                    <RadioGroup
                        {...returnsInputProps("gender")}
                        options={genderOptions}
                        value={gender}
                        onChange={set("gender")}
                    />
                </Item>
            </Container>
        </MUIContainer>
    );
}
