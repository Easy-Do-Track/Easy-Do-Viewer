import { useState, useEffect } from "react"

export function Status(){
    const [addr, setAddr] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(0);
    const [sensors, setSensors] = useState([0]);

    useEffect(()=>{
        // 여기서 webSocket 연결
        let ws = new WebSocket("ws://localhost:8080/status");

        ws.onmessage = (evt)=>{
            const res = JSON.parse(evt.data);

            setAddr(res.addr.toString());
            setLastUpdate(res.last_update.toString());
            setSensors(res.sensors);
        }

        return ()=>{
            // 여기서 cleanup
            if (!ws){
                return;
            }

            ws.close();
        };
    }, []);

    return <div className="status" style={{fontSize: '24px', height: 'auto'}}>
        <p style={{fontSize: '18px'}}>Last Update: {lastUpdate}</p>
        1. 주소: {addr}<br />
        <ul style={{fontSize: '20px'}}>
            {sensors.map(item => {
                return <li>{item}번 트래커 연결됨</li>
            })}
        </ul>
    </div>
}