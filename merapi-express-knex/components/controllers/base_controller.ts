import * as express from "express";
import { IBaseController } from "interfaces/controllers";
import { async, Component, IInjector, ILogger, utils } from "merapi";

export default class BaseController extends Component implements IBaseController {

    private verbMap: { [key: string]: string } = {
        list: "list",
        post: "create",
        get: "read",
        put: "update",
        delete: "delete",
    };

    constructor(
        protected logger: ILogger,
        protected injector: IInjector,
    ) {
        super();
    }

    public async crud(model: string, methods: any, request: any, response: any, next?: express.NextFunction): Promise<express.Router> {

        if (methods && typeof methods !== "string") {
            next = response;
            response = request;
            request = methods;
            methods = undefined;
        }

        const modelId = `${model}Id`;
        const specific: string[] = methods && methods.split(",").map((e: string) => e.trim());

        let verbs = Object.keys(this.verbMap);
        if (specific)
            verbs = verbs.filter((verb) => specific.find((e) => e === verb));

        const router = express.Router({ mergeParams: true });

        verbs.forEach((verb) => {
            const ability = `${this.verbMap[verb]}_any_${model}s, ${this.verbMap[verb]}_own_${model}s`;
            let path;

            if (verb === "post" || verb === "list") {
                path = "/";
            } else {
                path = `/:${modelId}`;
            }

            if (verb === "list") {
                router.route(path).get(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
                    await this.verb(verb, model, ability, request, response, next);
                });
            } else {
                const route: any = router.route(path);
                route[verb](async (request: express.Request, response: express.Response, next: express.NextFunction) => {
                    await this.verb(verb, model, ability, request, response, next);
                });
            }
        });

        return router(request, response, next);
    }

    private async verb(verb: string, model: string, ability: any, request: any, response: any, next?: express.NextFunction): Promise<void> {

        if (ability && typeof ability !== "string") {
            next = response;
            response = request;
            request = ability;
            ability = `${this.verbMap[verb]}_any_${model}s, ${this.verbMap[verb]}_own_${model}s`;
        }

        // const auth = await this.access.auth(request, ability);

        // if (!auth.authorized) {
        //     response.status(403).json({
        //         message: "You're not authorized to view this page.",
        //         status: "forbidden",
        //     });
        //     return;
        // }

        const method = `${model}.${verb}`;

        try {
            const { params, body, query, headers } = request;

            const m = await this.injector.resolveMethod(method);
            let result = m({ params, body, query, headers });

            if (utils.isPromise(result)) result = await result;

            response.status(200).send(result);
        } catch (error) {
            this.logger.warn({ ability, method, error });
            response.status(400).json({
                message: error.message,
                status: "error",
            });
        }

    }
}
