//Entities
import {
    ActorEntity,
    FixEntity,
    InvestmentEntity,
    MaterialEntity,
    MaterialTypeEntity,
    OrderEntity,
    UserEntity,
} from "../models";
//Controllers
import { buildController } from "./buildController";
import { getController } from "./get";
import { listController } from "./list";
import { loginController } from "./login";
import { registerController } from "./register";

export const ActorController = buildController(ActorEntity);
export const FixController = buildController(FixEntity);
export const InvestmentController = buildController(InvestmentEntity);
export const MaterialController = buildController(MaterialEntity);
export const MaterialTypeController = {
    list: listController(MaterialTypeEntity),
    getByName: getController(MaterialTypeEntity),
};
export const OrderController = buildController(OrderEntity);
export const UserController = {
    list: listController(UserEntity),
    getByName: getController(UserEntity),
    register: registerController,
    login: loginController,
};

export { AddControllerType, addGroupAlways } from "./add";
export { ControllerType } from "./buildController";
export { EditControllerType } from "./edit";
export { GetControllerType, GetOptions } from "./get";
export { ListControllerType, ListOptions } from "./list";
export { LoginControllerType } from "./login";
export { RemoveControllerType } from "./remove";
