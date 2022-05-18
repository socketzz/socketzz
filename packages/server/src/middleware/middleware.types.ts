
export type MiddlewareEventType = 'connection' | 'close' | 'error';

export interface IMiddleware {
    type: MiddlewareEventType
    handler: string
}
