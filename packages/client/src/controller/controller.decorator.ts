import { ControllerMeta, getControllerMeta, IControllerClass } from "./controller.meta"

export const Controller = (namespace: string) => {
    return (target: any) => {
        const meta: ControllerMeta = getControllerMeta(target.prototype);

        meta.namespace = namespace;
    }
}
