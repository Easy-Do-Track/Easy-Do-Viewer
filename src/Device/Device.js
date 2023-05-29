import React, { useState } from 'react';
import './Device.css';
import { useLocation } from "react-router-dom";
import { Preview } from '../components/preview';
import { Status } from '../components/Status';
import BgSetting from '../components/BgSetting';
import AvtSetting from '../components/AvtSetting';

const NavHead = (props) =>{
    return(
        <React.Fragment>
        <div id = "bar">
            <h1 id ="title">기기 관리</h1>
            <hr/>
            <p id = "username">{props.name}</p>
        </div>
        </React.Fragment>
    )
}

const SettingContainer = () =>{
    const [color, setColor] = useState("");
    const [avatar, setAvatar] = useState("");

    return(
        <React.Fragment>
            <div id ='settingcontainer'>
                <ImageContainer color={color} avatar={avatar} />

                <div style={{width: '33%'}}>
                    <Status /><br />
                    <AvtSetting setAvatar={setAvatar} /><br />
                    <BgSetting setColor={setColor} />
                </div>
            </div>
        </React.Fragment>
    )
}

const ImageContainer = (props) =>{
    return <Preview color={props.color} avatar={props.avatar} />
}

const Device = () =>{
    const location = useLocation();
    const name = location.state.name;
    return(
        <React.Fragment>
            <NavHead name = {name}></NavHead>
            <SettingContainer />
        </React.Fragment>
    )

}

export default Device;