import { JsonObject } from "merapi";
import { IContactMap } from "interfaces/descriptors";
export type Id<T> = T & { id: string };

export interface IPaginated<T> {
    items: T[];
    total?: number;
    limit: number;
    page: number;
}

export interface IContactMapRepo {
    list(page: number, limit: number): Promise<IContactMap[]>;
    get(contactId: string): Promise<IContactMap>;
    create(contactMap: IContactMap): Promise<IContactMap>;
    update(contactId: string, contactMap: IContactMap): Promise<IContactMap>;
    remove(contactId: string): Promise<IContactMap>;
}