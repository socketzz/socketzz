import { Controller, Event, Message, Socket, SocketInstance } from "../../packages/client/src";

interface IGreetingGet {
    greeting: string
}

@Controller('greeting')
export class GreetingController {
    @Event('get')
    public getGreeting (
        @Message() { greeting }: IGreetingGet,
        @Socket() socket: SocketInstance
    ) {
        console.log(`greeting:`, greeting);
        socket.close();
    }
}
