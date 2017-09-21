import { IContactDescriptor, IContactMap } from "interfaces/descriptors";
import { IContactManager } from "interfaces/managers";
import { IModelParams } from "interfaces/models";
import { Component, ILogger, JsonObject } from "merapi";

import ContactMapRepo from "components/repos/contact_map_repo";

export default class ContactManager extends Component {

    constructor(
        private logger: ILogger,
        private contactMapRepo: ContactMapRepo,
    ) {
        super();
    }

    public async list(modelParams: IModelParams) {
        const { query } = modelParams;
        const page = query.page ? parseInt(query.page) : 1;
        const limit = query.limit ? parseInt(query.limit) : 10;

        try {
            let items: IContactDescriptor[] = [];

            items = await this.contactMapRepo.list(page, limit);

            return { page, limit, items };
        } catch (error) {
            throw error;
        }
    }

    public async post(modelParams: IModelParams) {
        const { params, body } = modelParams;

        try {
            const { id, name, address, email, phone } = body;

            const contact: IContactDescriptor = { id, name, address, email, phone };

            await this.contactMapRepo.create(contact);

            return contact;
        } catch (error) {
            throw error;
        }
    }

    public async get(modelParams: IModelParams) {
        const { params, body } = modelParams;
        const { contactId } = params;

        try {

            const contacMap = await this.contactMapRepo.get(contactId);

            if (!contacMap) {
                throw new Error("Contact not found.");
            }

            return contacMap;
        } catch (error) {
            throw error;
        }
    }

    public async put(modelParams: IModelParams) {
        const { params, body, query } = modelParams;
        const { contactId } = params;

        try {
            const contactMap = await this.contactMapRepo.get(contactId);

            if (!contactMap) {
                throw new Error("Contact not found.");
            }

            return await this.contactMapRepo.update(contactId, body);

        } catch (error) {
            throw error;
        }
    }

    public async delete(modelParams: IModelParams) {
        const { params, body } = modelParams;
        const { contactId } = params;

        try {

            const contactMap = await this.contactMapRepo.get(contactId);
            if (!contactMap) {
                throw new Error("Contact not found.");
            }

            await this.contactMapRepo.remove(contactId);

            return contactMap;
        } catch (error) {
            throw error;
        }
    }

}
