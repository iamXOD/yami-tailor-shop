//Entities
import ActorEntity from "../models/Actor";
import FixEntity from "../models/Fix";
import InvestmentEntity from "../models/Investment";
import MaterialEntity from "../models/Material";
import OrderEntity from "../models/Order";
//Controllers
import GenericController from "./GenericController";

export const ActorController = GenericController(ActorEntity);
export const FixController = GenericController(FixEntity);
export const InvestmentController = GenericController(InvestmentEntity);
export const MaterialController = GenericController(MaterialEntity);
export const OrderController = GenericController(OrderEntity);

export * as MaterialTypeController from "./MaterialType";
export * as UserController from "./User";
