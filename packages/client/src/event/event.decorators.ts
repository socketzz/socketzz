import { getControllerMeta } from "../controller"
import { IEvent } from "./event.types";

export const Event = (eventName: string) => {
    return (target: any, methodName: string) => {
        const meta = getControllerMeta(target);

        const event: IEvent = {
            name: eventName,
            handler: methodName
        }

        meta.events = [
            ...meta.events,
            event
        ];
    }
}
