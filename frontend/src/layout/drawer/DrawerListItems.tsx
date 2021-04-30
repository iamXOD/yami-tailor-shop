//Imports
import { ReactElement } from "react";
//App Imports
import { DrawerItem, DrawerNavItem } from "./DrawerNavItem";

export interface DrawerCollection {
    name?: string;
    items: DrawerItem[];
}

type Props = { items: DrawerCollection["items"]; onClick: { (): void } };

export const DrawerListItems = ({ items, onClick }: Props): ReactElement => {
    return (
        <>
            {items
                .filter(({ hidden }) => !hidden)
                .map((item, i) => (
                    <DrawerNavItem key={i} item={item} onClick={onClick} />
                ))}
        </>
    );
};
