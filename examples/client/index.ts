
import { SocketClient } from '../../packages/client/src';
import { SimpleController } from './simple.controller';
import { GreetingController } from './greeting.controller';

const client = SocketClient.configure({
    controllers: [
        SimpleController,
        GreetingController
    ]
});

client.connect({
    url: 'ws://localhost:4001'
});

