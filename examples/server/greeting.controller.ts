import { Controller, Event, Message, Socket, SocketClient } from "../../packages/server/src";

interface IGreetingGet {
    greeting: string
}

interface IGreetingSendName {
    name: string
}

@Controller('greeting')
export class GreetingController {
    @Event('sendName')
    public sendName (
        @Message() { name }: IGreetingSendName,
        @Socket() socket: SocketClient
    ) {
        const greeting: string = `hello, ${name}`;

        console.log('greeting:', greeting);

        socket.send({
            event: 'get',
            message: { greeting }
        });
    }
}
