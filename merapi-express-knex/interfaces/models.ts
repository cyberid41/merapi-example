import { JsonObject } from "merapi";

export interface IRequestParams {
    [param: string]: string;
    [captureGroup: number]: string;
}

export interface IRequestQuery {
    [queryParam: string]: string;
}

export interface IModelParams {
    params: IRequestParams;
    body: any;
    query: IRequestQuery;
    headers: any;
}
