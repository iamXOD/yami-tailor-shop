//Imports
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ActorEntity from "../models/Actor";
import InvestmentEntity from "../models/Investment";
import MaterialEntity from "../models/Material";

export async function list(): Promise<InvestmentEntity[]> {
    return await getRepository(InvestmentEntity).find();
}

export async function get(id: number): Promise<InvestmentEntity> {
    const investment = await getRepository(InvestmentEntity).findOne(id);
    if (!investment) {
        throw new EntityNotFound("Investment", `id: ${id}`);
    }
    return investment;
}

export async function add(
    investment: InvestmentEntity
): Promise<InvestmentEntity> {
    const correctInvestment = plainToClass(InvestmentEntity, investment);

    await validateAndThrowError(correctInvestment);

    if (
        !(await getRepository(ActorEntity).findOne(correctInvestment.supplier))
    ) {
        throw new EntityNotFound(
            "Supplier",
            `id: ${correctInvestment.supplier}`
        );
    }
    if (
        !(await getRepository(MaterialEntity).findOne(
            correctInvestment.material
        ))
    ) {
        throw new EntityNotFound(
            "Material",
            `id: ${correctInvestment.material}`
        );
    }
    return await getRepository(InvestmentEntity).save(correctInvestment);
}

export async function edit(
    investment: InvestmentEntity
): Promise<InvestmentEntity> {
    const correctInvestment = plainToClass(InvestmentEntity, investment);

    await validateAndThrowError(correctInvestment, {
        skipMissingProperties: true,
    });

    if (
        !(await getRepository(ActorEntity).findOne(correctInvestment.supplier))
    ) {
        throw new EntityNotFound(
            "Supplier",
            `id: ${correctInvestment.supplier}`
        );
    }
    if (
        !(await getRepository(MaterialEntity).findOne(
            correctInvestment.material
        ))
    ) {
        throw new EntityNotFound(
            "Material",
            `id: ${correctInvestment.material}`
        );
    }
    const investmentRepo = getRepository(InvestmentEntity);
    if (!(await investmentRepo.findOne(correctInvestment.id))) {
        throw new EntityNotFound("Investment", `id: ${correctInvestment.id}`);
    }
    return await investmentRepo.save(correctInvestment);
}

export async function remove(id: number): Promise<void> {
    const investmentRepo = getRepository(InvestmentEntity);
    const investment = await investmentRepo.findOne(id);
    investment && (await investmentRepo.remove(investment));
}

export default {
    list,
    get,
    add,
    edit,
    remove,
};
