import {wsSearchMessage} from "./types";
import {WebSocket} from 'ws';
import {searchHotels} from "./services/search";

export const onSearchMessage = async (ws: WebSocket, message: wsSearchMessage) => {
    // in real server i will add hare log and validation for the data
    await Promise.all(searchHotels(message.data.search).map(async result => {
        try {
            // todo add heartbeat and check is alive
            ws.send(JSON.stringify(await result))
        } catch (e) {
            // todo add client id to connection and log hare this id
            console.error('fail to send message to client', e)
        }
    }));

    ws.close()
}