//Imports
import { ReactElement } from "react";
//App Imports
import DrawerNavItem, { DrawerItem } from "./DrawerNavItem";

export interface DrawerCollection {
    name?: string;
    items: DrawerItem[];
}

type Props = { items: DrawerCollection["items"]; onClick: { (): void } };

export default function DrawerListItems({
    items,
    onClick,
}: Props): ReactElement {
    return (
        <>
            {items
                .filter(({ hidden }) => !hidden)
                .map((item, i) => (
                    <DrawerNavItem key={i} item={item} onClick={onClick} />
                ))}
        </>
    );
}
