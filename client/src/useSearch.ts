import {useRef, useState} from "react";

// should not be hera only to make life easy
const serverUrl = 'ws://localhost:6969'

export const useSearch = () => {
    const [result, setResult] = useState<any[]>([]);

    const socket = useRef<WebSocket | null>(null)
    const onSearch = (search: {
        startDate: string,
        endDate: string,
        locationId: number,
        groupSize: number
    }) => {
        if (socket.current) {
            try {
                socket.current.close()
            } catch (e: any) {

            }
        }
        setResult([])
        socket.current = new WebSocket(serverUrl)
        // todo add unsubscribe
        socket.current.addEventListener('open', () => {
            socket.current!.send(JSON.stringify({
                type: "search", data: {
                    search: {
                        startDate: search.startDate,
                        endDate: search.endDate,
                        locationId: search.locationId,
                        groupSize: search.groupSize
                    }
                }
            }))
        });
        socket.current.addEventListener('message', (e) => {
            setResult(results => [...results, ...JSON.parse(e.data)]
                .sort((roomA, roomB) => roomA.price - roomB.price))
        });
    }
    return {onSearch, results: result}
}
