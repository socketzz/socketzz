
import { SocketServer } from '../../packages/server/src';

import { SimpleController } from './simple.controller';
import { GreetingController } from './greeting.controller';

const server = new SocketServer({
    controllers: [
        SimpleController,
        GreetingController
    ]
});

server.listen({
    port: 4001
});

console.log('server started at 4001 port')
