import type { WebSocket } from "ws";
import type { ISocketSendOptions } from './socket.types';

export class SocketClient {
    public constructor (
        private readonly namespace: string,
        private readonly ws: WebSocket
    ) {}

    public send<T = any> ({
        namespace = this.namespace,
        event,
        message
    }: ISocketSendOptions<T>) {
        const route: string = `${namespace}/${event}`;
        
        const stringifiedMessage: string = JSON.stringify({
            route,
            data: message
        });

        this.ws.send(stringifiedMessage);
    }

    public close (
        code?: number,
        reason?: string
    ) {
        this.ws.close(code, reason);
    }
}
