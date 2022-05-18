
import WebSocket, { MessageEvent } from 'isomorphic-ws';
import { getControllerMeta } from '../controller';
import { ControllerAdapter } from '../controller/controller.adapter';
import {  MiddlewareType } from '../middlewares';

import type { IType } from '../types';
import { SocketInstance } from './socket.instance';
import type { IClientConfig, IConnectConfig, IMessage, IRoute } from './socket.types';

export class SocketClient {
    private static instance: SocketClient;

    private ws?: WebSocket;

    public controllerAdapter: ControllerAdapter = new ControllerAdapter();

    private controllers: Array<IType>;

    public constructor ({
        controllers
    }: IClientConfig) {
        this.controllers = controllers.map(Controller => new Controller());
    }

    public static configure (config: IClientConfig): SocketClient {
        if (!SocketClient.instance) {
            SocketClient.instance = new SocketClient(config);
        }

        return SocketClient.instance;
    }

    private mapMiddlewares (type: MiddlewareType) {
        for (let controller of this.controllers) {
            const controllerMeta = getControllerMeta(controller);

            for (let middleware of controllerMeta.middlewares) {
                if (middleware.type !== type) continue;

                const handler = (controller as any)[middleware.handler];

                let args: any[] = [];

                if (type === 'open') {
                    args.push(new SocketInstance(controllerMeta.namespace, this.ws as WebSocket));
                }

                handler(...args);
            }
        }
    }

    private mapEvents (routes: Array<IRoute>, { data }: MessageEvent) {
        const message: IMessage = JSON.parse(data as string);

        for (let route of routes) {
            if (message.route !== route.name) continue;

            let args: any[] = [];

            for (let param of route.params) {
                if (param.type === 'message') {
                    args[param.index] = message.data;
                }

                if (param.type === 'socket') {
                    args[param.index] = new SocketInstance(route.namespace, this.ws as WebSocket);
                }
            }

            route.handler(...args);
        }
    }

    public connect ({
        url
    }: IConnectConfig) {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => this.mapMiddlewares('open');
        this.ws.onclose = () => this.mapMiddlewares('close');
        this.ws.onerror = () => this.mapMiddlewares('error');

        const routes: Array<IRoute> = this.controllerAdapter.generateRoutes(this.controllers);

        this.ws.onmessage = msg => this.mapEvents(routes, msg);
    }

    public disconnect () {
        this.ws?.close();
        this.ws = undefined;
    }

    public getSocket (namespace: string): SocketInstance {
        if (!this.ws) throw new Error('WebSocket instance is undefined');

        return new SocketInstance(namespace, this.ws);
    }
}
