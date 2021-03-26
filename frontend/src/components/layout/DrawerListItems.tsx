//Imports
import { ReactElement } from "react";
//App Imports
import { DrawerCollection } from "../../types";
import DrawerNavItem from "./DrawerNavItem";

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
