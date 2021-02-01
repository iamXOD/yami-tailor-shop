//App Imports
import DrawerNavItem from "./DrawerNavItem";

//Types
import { ReactElement } from "react";
import { DrawerCollection } from "../../types";
type Props = { items: DrawerCollection["items"], onClick: { (): void } };

export default function DrawerListItems({ items, onClick }: Props): ReactElement {
    return <>{items.filter(({ hidden }) => !hidden)
        .map((item, i) => (<DrawerNavItem key={i} item={item} onClick={onClick} />))
    }</>
}