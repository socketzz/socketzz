
import { getControllerMeta } from '../controller';
import type { MiddlewareType, IMiddleware } from './middlewares.types';

const makeDecorator = (type: MiddlewareType) => {
    return (target: any, methodName: string) => {
        const meta = getControllerMeta(target);

        const middleware: IMiddleware = {
            type,
            handler: methodName
        }

        meta.middlewares.push(middleware);
    }
}

export const OnOpen = () => makeDecorator('open');
export const OnClose = () => makeDecorator('close');
export const OnError = () => makeDecorator('error');
