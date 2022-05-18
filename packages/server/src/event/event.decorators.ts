import { ControllerMeta, getControllerMeta } from "../controller"
import { IEvent } from "./event.types";

export const Event = (eventName: string) => {
    return (target: any, methodName: string) => {
        const meta: ControllerMeta = getControllerMeta(target);
    
        const event: IEvent = {
            name: eventName,
            handler: methodName
        };
    
        meta.events = [
            ...meta.events,
            event
        ];
    };
}