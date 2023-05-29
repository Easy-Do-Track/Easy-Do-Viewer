import { useState, useEffect } from "react"
import MMDModel from "./MMDModel";

export function Preview(props){
    const [data, setData] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(0);

    const [color, setColor] = useState(props.color);
    const [avatar, setAvatar] = useState(props.avatar);

    useEffect(()=>{
        setColor(color);
        setAvatar(avatar);

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
        {/* <MMDModel data={JSON.parse(data)} gui={true} color={color} model="mmd/Model/Miku_Hatsune.pmd"/> */}
        <MMDModel data={JSON.parse(data)} gui={true} color={color} model={avatar}/>
        last update: {lastUpdate.toString()}
        <pre>
            {data}
        </pre>
    </div>
}