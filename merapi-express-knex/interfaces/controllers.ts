import * as express from "express";

export interface IBaseController {
    crud(model: string, excludeMethods: string, request: express.Request, response: express.Response, next: express.NextFunction): Promise<express.Router>;
    crud(model: string, request: express.Request, response: express.Response, next: express.NextFunction): Promise<express.Router>;
}