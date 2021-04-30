//Imports
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioProps,
} from "@material-ui/core";
import MUIRadioGroup from "@material-ui/core/RadioGroup";
import { ChangeEvent, ReactElement, ReactNode } from "react";

export interface RadioButtonOption<T> {
    label: string;
    value: T;
    icon?: ReactNode;
    checkedIcon?: ReactNode;
    color?: RadioProps["color"];
    disabled?: boolean;
}
type Props<T> = {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    options: RadioButtonOption<T>[];
};

export default function RadioGroup<T>({
    label,
    options,
    name,
    value,
    onChange,
}: Props<T>): ReactElement {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <MUIRadioGroup
                name={name}
                row={true}
                value={value}
                onChange={onChange}>
                {options.map(({ value, label, disabled, ...props }, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Radio {...props} />}
                        value={value}
                        label={label}
                        disabled={disabled}
                        labelPlacement={props.icon ? "bottom" : "end"}
                    />
                ))}
            </MUIRadioGroup>
        </FormControl>
    );
}
