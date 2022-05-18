
import type { IRoute } from "../socket";
import type { IType } from "../types";

import { getControllerMeta } from "./controller.meta";

export class ControllerAdapter {
    public generateRoutes (controllers: Array<IType>): Array<IRoute> {
        let routes: Array<IRoute> = [];

        for (let controller of controllers) {
            const { namespace, events, params } = getControllerMeta(controller);

            for (let event of events) {
                let name: string = `${namespace}/${event.name}`;
                const handler = (controller as any)[event.handler];

                routes.push({
                    name,
                    handler,
                    namespace,
                    methodName: event.handler,
                    params: params[event.handler] || []
                })
            }
        }

        return routes;
    }
}
