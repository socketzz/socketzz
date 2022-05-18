
import type { IType } from '../types';

import {
    ControllerMeta,
    getControllerMeta
} from './controller.meta';

export const Controller = (namespace: string) => {
    return (target: any): void => {
        const meta: ControllerMeta = getControllerMeta(target.prototype);

        meta.namespace = namespace;
    }
}
