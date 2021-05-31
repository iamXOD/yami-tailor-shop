//Imports
import { ClassConstructor } from "class-transformer";
//App Imports
import { addController, AddControllerType } from "./add";
import { editController, EditControllerType } from "./edit";
import { getController, GetControllerType } from "./get";
import { listController, ListControllerType } from "./list";
import { removeController, RemoveControllerType } from "./remove";

export interface ControllerType<T> {
    list: ListControllerType<T>;
    get: GetControllerType<T>;
    add: AddControllerType<T>;
    edit: EditControllerType<T>;
    remove: RemoveControllerType<T>;
}

export function buildController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): ControllerType<T> {
    return {
        list: listController(Entity),
        get: getController(Entity, Entity.name),
        add: addController(Entity),
        edit: editController(Entity),
        remove: removeController(Entity),
    };
}

export default buildController;
