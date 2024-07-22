import { createServer } from "http";
import { Server} from "socket.io";
import { socketServerEnv } from "./utils/validateEnv";
import { InitSocket } from "./socket";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

InitSocket(io);

httpServer.listen(socketServerEnv.PORT, () => console.log(`listening on port: ${socketServerEnv.PORT}`));