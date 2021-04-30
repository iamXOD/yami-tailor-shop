import { useState } from "react";

type Return = [boolean, () => void, () => void];

export function useToggler(initialValue?: boolean): Return {
    const [value, setValue] = useState<boolean>(initialValue || false);
    const open = () => setValue(true);
    const close = () => setValue(false);

    return [value, open, close];
}

export default useToggler;
