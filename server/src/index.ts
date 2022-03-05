import 'dotenv/config'
import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';
import cors from 'cors';
import {wsMessage} from "./types";
import {onSearchMessage} from "./wsControllers";

const app = express();
app.use(cors())

app.get('/hi', (req, res,) => {
    res.send('hi')
})
const index = http.createServer(app);

const wss = new WebSocketServer({server: index});

wss.on('connection', (ws) => {
    ws.on('message', (message: string) => {
        let parsedMessage: wsMessage;
        try {
            parsedMessage = JSON.parse(message)

        } catch (e) {
            console.error('fail to parse request', message)
            return
        }
        if (parsedMessage.type === "search") {
            onSearchMessage(ws, parsedMessage)
        }
    });
});

index.listen(process.env?.PORT || 8999, () => {
    console.log(`Server started on ${JSON.stringify(index.address())} :)`);
});