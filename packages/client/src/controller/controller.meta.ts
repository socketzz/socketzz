import { IEvent } from "../event";
import { IMiddleware } from "../middlewares";
import type { IParam } from "../params";

export interface IControllerMetaParams {
    [methodName: string]: Array<IParam>
}

export class ControllerMeta {
    public namespace: string = '';
    public events: Array<IEvent> = [];
    public middlewares: Array<IMiddleware> = [];
    public params: IControllerMetaParams = {};
}

export interface IControllerClass extends Object {
    _socket_meta?: ControllerMeta
}

export const getControllerMeta = (target: IControllerClass): ControllerMeta => {
    if (!target._socket_meta) {
        target._socket_meta = new ControllerMeta();
    }
    return target._socket_meta;
}
