import {
    Socket,
    Controller,
    Event,
    OnClose,
    OnConnection,
    Message,
    SocketClient,
    OnError
} from "../../packages/server/src";

interface IPingMessage {
    foo: string
}

@Controller('simple')
export class SimpleController {
    @OnConnection()
    public onConnection () {
        console.log('simple on connection');
    }

    @OnClose()
    public onClose () {
        console.log('simple on close');
    }

    @OnError()
    public onError () {
        console.error('simple on error');
    }

    @Event('ping')
    public ping (
        @Message() message: IPingMessage,
        @Socket() socket: SocketClient
    ) {
        console.log('ping message', message);
        socket.send<IPingMessage>({
            event: 'pong',
            message: {
                foo: 'baz'
            }
        });
    }
}

