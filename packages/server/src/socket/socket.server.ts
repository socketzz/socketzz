
import WebSocket, { WebSocketServer } from 'ws';
import { getControllerMeta } from '../controller';
import { ControllerAdapter } from '../controller/controller.adapter';
import { IType } from '../types';
import { SocketClient } from './socket.client';

import type {
    IMessage,
    IRoute,
    IServerConfig,
    IServerListenConfig
} from './socket.types';

export class SocketServer {
    private ws?: WebSocketServer;

    private controllerAdapter: ControllerAdapter = new ControllerAdapter();

    private controllers: Array<IType> = [];

    public constructor ({
        controllers
    }: IServerConfig) {
        this.controllers = controllers.map(SocketController => new SocketController());
    }

    private mapEvents (events: Array<IRoute>) {
        this.ws?.on('connection', ws => {
            ws.on('message', rawData => {
                const message: IMessage = JSON.parse(rawData.toString());

                for (let event of events) {
                    if (message.route === event.name) {
                        let args: any[] = [];

                        for (let param of event.params) {
                            if (param.type === 'message') {
                                args[param.index] = message.data;
                            }

                            if (param.type === 'socket') {
                                const socket = new SocketClient(event.namespace, ws);
                                args[param.index] = socket;
                            }
                        }

                        event.handler(...args);
                    }
                }
            });

            this.mapMiddlewares(ws);
        });
    }

    private mapMiddlewares (ws: WebSocket) {
        for (let controller of this.controllers) {
            const controllerMeta = getControllerMeta(controller);

            for (let middleware of controllerMeta.middlewares) {
                const handler = (controller as any)[middleware.handler];9

                if (middleware.type === 'connection') {
                    handler(new SocketClient(controllerMeta.namespace, ws));
                    continue;
                }

                ws.on(middleware.type, () => {
                    handler();
                })
            }
        }
    }

    public listen ({
        port
    }: IServerListenConfig) {
        const events: Array<IRoute> = this.controllerAdapter.generateRoutes(this.controllers);

        this.ws = new WebSocket.Server({
            port
        });

        this.mapEvents(events);
    }
}
