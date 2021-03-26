//Imports
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
    value: string;
    onChange: { (e: ChangeEvent<HTMLInputElement>): void };
};
type Reset = { (): void };
type Return = [Props, Reset, Dispatch<SetStateAction<string>>];

export default function useInput(initialValue: string): Return {
    const [value, setValue] = useState(initialValue);
    return [
        {
            value,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value),
        },
        () => setValue(initialValue),
        setValue,
    ];
}
