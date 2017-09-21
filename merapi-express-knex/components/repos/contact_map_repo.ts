import { IContactMap } from "interfaces/descriptors";
import { IContactMapRepo } from "interfaces/repos";
import * as IKnex from "knex";
import { Component, IConfigReader, ILogger } from "merapi";
import { v4 as uuid } from "node-uuid";

export default class ContactMapRepo extends Component implements IContactMapRepo {

    private tableName: string;

    constructor(
        private config: IConfigReader,
        private logger: ILogger,
        private knex: IKnex) {
        super();
        this.tableName = "contacts";
    }

    public async list(page: number, limit: number): Promise<IContactMap[]> {
        return await this.knex(this.tableName).limit(limit).offset((page - 1) * limit);
    }

    public async create(object: IContactMap): Promise<IContactMap> {
        const item = { ...(object as any) };

        if (!item.id) {
            item.id = uuid();
        }

        await this.knex(this.tableName).insert(item);

        return item;
    }

    public async get(id: string): Promise<IContactMap> {
        return await this.knex(this.tableName).where({ id }).first();
    }

    public async update(id: string, contactMap: IContactMap): Promise<IContactMap> {
        await this.knex(this.tableName).where({ id }).update(contactMap);

        return await this.knex(this.tableName).where({ id }).first();
    }

    public async remove(id: string): Promise<IContactMap> {
        const item = await this.knex.transaction(async (trx: any) => {
            const result = await trx.select().from(this.tableName).where({ id }).forUpdate();
            await trx.from(this.tableName).where({ id }).del();

            return result;
        });

        return item;
    }
}
