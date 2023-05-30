import { useState, useEffect } from "react"

export function Status(){
    const [addr, setAddr] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(0);
    const [sensors, setSensors] = useState([0]);

    useEffect(()=>{
        async function fetchData() {
            await fetch("http://localhost:8080/status")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAddr(data.addr.toString());
                setLastUpdate(data.last_update.toString());
                setSensors(data.sensors);
            }).catch((e) => {
                console.log(e);
            });
        }
        fetchData();
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