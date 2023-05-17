import { useState, useEffect } from "react"
import MMDModel from "./MMDModel";

export function Preview(){
    const [data, setData] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(0);

    useEffect(()=>{
        // 여기서 webSocket 연결
        let ws = new WebSocket("ws://localhost:8080/stream");

        ws.onmessage = (evt)=>{
            setData(evt.data);
            setLastUpdate(new Date())
        }

        return ()=>{
            // 여기서 cleanup
            if (!ws){
                return;
            }

            ws.close();
        };
    }, []);

    return <div className="preview">
        last update: {lastUpdate.toString()}
        <pre>
            {data}
        </pre>
        <MMDModel />
    </div>
}