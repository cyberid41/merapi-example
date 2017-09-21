import * as express from "express";
import { Component, IInjector, ILogger } from 'merapi';
import BaseController from "./base_controller";

export default class ContactController extends BaseController {

    constructor(
        public logger: ILogger,
        public injector: IInjector,
    ) {
        super(logger, injector);
    }
}