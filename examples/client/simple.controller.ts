
import { Controller, Event, Message, OnClose, OnError, OnOpen, Socket, SocketInstance } from '../../packages/client/src';

interface IPingMessage {
    foo: string
}

interface IGreetingSendName {
    name: string
}

@Controller('simple')
export class SimpleController {
    @OnOpen()
    public onOpen (socket: SocketInstance) {
        console.log('simple open');

        socket.send({
            event: 'ping',
            message: {
                foo: 'bar'
            }
        });
    }

    @OnClose()
    public onClose () {
        console.log('simple close');
    }

    @OnError()
    public onError () {
        console.error('simple error');
    }

    @Event('pong')
    public onPong (
        @Message() msg: IPingMessage,
        @Socket() socket: SocketInstance
    ) {
        console.log('pong message', msg);
        socket.send<IGreetingSendName>({
            namespace: 'greeting',
            event: 'sendName',
            message: {
                name: 'torigetz'
            }
        });
    }
}
