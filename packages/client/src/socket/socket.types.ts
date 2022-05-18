
import { IParam } from '../params';
import type { IType } from '../types';

export interface IClientConfig {
    controllers: Array<IType>
}

export interface IConnectConfig {
    url: string
}

export interface IRoute {
    name: string
    methodName: string
    namespace: string
    params: Array<IParam>
    handler: Function
}

export interface ISocketSendOptions<T = any> {
    namespace?: string
    event: string,
    message: T
}

export interface IMessage {
    route: string
    data: any
}
