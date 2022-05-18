
export type MiddlewareType = 'open' | 'close' | 'error';

export interface IMiddleware {
    type: MiddlewareType
    handler: string
};
