import { useState } from "react";

type Return = [boolean, () => void, () => void];

export default function useToggler(initialValue?: boolean): Return {
    const [value, setValue] = useState<boolean>(initialValue || false);
    const open = () => setValue(true);
    const close = () => setValue(false);

    return [value, open, close];
}
