import { ReactElement, ReactNode } from "react";
import { ButtonProps, RadioProps } from "@material-ui/core";
import { Actor, User } from "../store/models";

//Reducer State
export interface State {
    user: UserState,
    actor: ActorState
}
export interface UserState {
    isAuthenticated: boolean,
    user: User
}

export interface ActorState {
    actors: Actor[]
}

export type TODO = any;

export type OneOrMany<T> = T | T[];

export interface DrawerItem {
    label: string,
    Icon?: TODO,
    url: string,
    hidden?: boolean,
    disabled?: boolean
}

export interface DrawerCollection {
    name?: string,
    items: DrawerItem[]
}

export type DrawerMenuItem = DrawerCollection[];

export interface TableHeader<T> {
    name: keyof T,
    isHidden?: boolean,
    isActive?: boolean,
    isNonSortable?: boolean,
    order?: "desc" | "asc"
    label?: string
}

export type CustomRender<T> = Partial<Record<keyof T, (item: T) => ReactElement>>;

export type Primitive = string | boolean | number | symbol;

export type Actionable = { actions: null };
export type ActionType<T> = T & Actionable;

export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;

type ButtonLinkProps = {
    to: string,
    className?: string,
    color?: ButtonProps["color"],
    variant?: ButtonProps["variant"],
    disabled?: boolean,
    text?: string,
    Icon?: TODO
};
type IconButtonLinkProps = Omit<ButtonLinkProps, "Icon">;

export interface RadioButtonOption<T> {
    label: string,
    value: T,
    icon?: ReactNode,
    checkedIcon?: ReactNode,
    color?: RadioProps["color"],
    disabled?: boolean
}