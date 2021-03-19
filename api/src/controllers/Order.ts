//Imports
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ActorEntity from "../models/Actor";
import MaterialEntity from "../models/Material";
import OrderEntity from "../models/Order";

export async function list(): Promise<OrderEntity[]> {
    return await getRepository(OrderEntity).find();
}

export async function get(id: number): Promise<OrderEntity> {
    const order = await getRepository(OrderEntity).findOne(id);
    if (!order) {
        throw new EntityNotFound("Order", `id: ${id}`);
    }
    return order;
}

export async function add(order: OrderEntity): Promise<OrderEntity> {
    const correctOrder = plainToClass(OrderEntity, order);

    await validateAndThrowError(correctOrder);

    if (!(await getRepository(ActorEntity).findOne(correctOrder.costumer))) {
        throw new EntityNotFound("Costumer", `id: ${correctOrder.costumer}`);
    }

    if (!(await getRepository(MaterialEntity).findOne(correctOrder.material))) {
        throw new EntityNotFound("Material", `id: ${correctOrder.material}`);
    }

    return await getRepository(OrderEntity).save(correctOrder);
}

export async function edit(order: OrderEntity): Promise<OrderEntity> {
    const correctOrder = plainToClass(OrderEntity, order);

    await validateAndThrowError(correctOrder, { skipMissingProperties: true });

    if (!(await getRepository(ActorEntity).findOne(correctOrder.costumer))) {
        throw new EntityNotFound("Costumer", `id: ${correctOrder.costumer}`);
    }

    if (!(await getRepository(MaterialEntity).findOne(correctOrder.material))) {
        throw new EntityNotFound("Material", `id: ${correctOrder.material}`);
    }

    const orderRepo = getRepository(OrderEntity);
    if (!(await orderRepo.findOne(correctOrder.id))) {
        throw new EntityNotFound("Order", `id: ${correctOrder.id}`);
    }
    return await orderRepo.save(correctOrder);
}

export async function remove(id: number): Promise<void> {
    const orderRepo = getRepository(OrderEntity);
    const order = await orderRepo.findOne(id);
    order && (await orderRepo.remove(order));
}

export default {
    list,
    get,
    add,
    edit,
    remove,
};
