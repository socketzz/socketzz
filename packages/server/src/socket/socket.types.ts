
import type { IParam } from "../params"
import type { IType } from "../types"

export interface IServerConfig {
    controllers: Array<IType>
}

export interface IServerListenConfig {
    port: number
}

export interface IRoute {
    name: string
    methodName: string
    namespace: string
    params: Array<IParam>
    handler: Function
}

export interface IMessage {
    route: string
    data: any
}

export interface ISocketSendOptions<T = any> {
    namespace?: string
    event: string
    message: T
}