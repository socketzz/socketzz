# socketzz
WebSocket with decorators and Typescript

## Install
```sh
$ yarn add @socketzz/server # for server
```
```sh
$ yarn add @socketzz/client # for client
```
## Server example
```typescript
import {
    SocketServer,
    SocketClient,
    Socket,
    Controller,
    OnConnection,
    Event,
    Message
} from '@socketzz/server'

@Controller('app')
class AppController {
    @OnConnection()
    public onConnection (socket: SocketClient) {
        socket.send({
            event: 'hello',
            message: {
                foo: 'bar'
            }
        });
    }

    @Event('greeting')
    public greeting (
        @Message() msg: { greeting: string },
        @Socket() socket: SocketClient
    ) {
        console.log(msg);
        socket.close();
    }
}

const server = new SocketServer({
    controllers: [AppController]
});

server.listen({ port: 3000 });
```

## Client example
```typescript
import {
    SocketClient,
    Controller,
    Event,
    OnOpen,
    Socket,
    Message,
    SocketInstance
} from '@socketzz/client';

@Controller('app')
class AppController {
    @OnOpen()
    public onOpen () {
        console.log('connection opened');
    }

    @Event('hello')
    public hello (
        @Socket() socket: SocketInstance,
        @Message() { foo }: { foo: string }
    ) {
        console.log(`foo:`, foo);
        socket.send({
            namespace: 'app', // optional
            event: 'greeting',
            message: {
                greeting: `hello, ${foo}!`
            }
        })
    }
}

const client = SocketClient.configure({
    controllers: [AppController]
});

client.connect({
    url: 'ws://localhost:3000'
})
```

## License
See [LICENSE](./LICENSE)