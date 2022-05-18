import { getControllerMeta } from "../controller";
import type { IParam, ParamType } from "./params.types";

const makeDecorator = (type: ParamType) => {
    return (wrapper?: any) => {
        return (target: any, methodName: string, index: number) => {
            const meta = getControllerMeta(target);

            const param: IParam = {
                type,
                index
            };

            if (meta.params[methodName] === undefined) {
                meta.params[methodName] = [];
            }

            meta.params[methodName].push(param);
        }
    }
}

export const Socket = makeDecorator('socket');
export const Message = makeDecorator('message');
