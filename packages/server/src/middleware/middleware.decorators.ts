import { getControllerMeta } from "../controller";
import type { IMiddleware, MiddlewareEventType } from "./middleware.types";

const makeDecorator = (type: MiddlewareEventType) => {
    return (target: any, methodName: string): void => {
        const meta = getControllerMeta(target);

        const middleware: IMiddleware = {
            type,
            handler: methodName
        };

        meta.middlewares = [
            ...meta.middlewares,
            middleware
        ];
    }
}

export const OnConnection = () => makeDecorator('connection');
export const OnClose = () => makeDecorator('close');
export const OnError = () => makeDecorator('error');