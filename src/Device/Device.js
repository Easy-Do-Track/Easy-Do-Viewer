import React, { useEffect, useState } from 'react';
import './Device.css';
import { useLocation } from "react-router-dom";
import { Preview } from '../components/preview';
import { Status } from '../components/Status';
import Swal from "sweetalert2";

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
    const avtDict = {
        "하츠네 미쿠": 'mmd/Model/Miku_Hatsune.pmd',
        "LAT 미쿠": 'mmd/Model/LAT/LAT Miku Hatsune (Chee-shep Edit).pmx',
        "여름 미쿠": "mmd/Model/SAILOR/Miku Hatsune (Summer Sailor).pmx",
        "겨울 미쿠": "mmd/Model/SAILOR/Miku Hatsune (Winter Sailor).pmx",
        "사쿠라 미쿠": "mmd/Model/Sakura/LAT Sakura Miku Hatsune.pmx",
        "스노우 미쿠": "mmd/Model/Snow/LAT Snow Miku.pmx",
        "카가미네 린": 'mmd/Model/Rin_Kagamine.pmd',
        "카가미네 렌": "mmd/Model/Len_Kagamine.pmd",
        "사키네 메이코": 'mmd/Model/MEIKO.pmd',
        "LAT 메이코": "mmd/Model/Meiko/LAT Meiko Sakine.pmx",
        "요와네 하쿠": 'mmd/Model/Haku_Yowane.pmd',
        "아키타 네루": 'mmd/Model/Neru_Akita.pmd',
        "시유": "mmd/Model/SeeU/LAT SeeU.pmx"
    };

    const [color, setColor] = useState("#ffffff");
    const [avatar, setAvatar] = useState("mmd/Model/Miku_Hatsune.pmd");
    const [name, setName] = useState("하츠네 미쿠");
    const checkBoxesColor = document.getElementsByName('color')
    const checkBoxesAvatar = document.getElementsByName('avatar')

    const onColorChange = (e) => {
        for (let i = 0; i < checkBoxesColor.length; i++) {
            checkBoxesColor[i].checked = false
        }
        setColor(e.target.value);
    }

    const checkOnlyOneColor = (checkThis) => {
        for (let i = 0; i < checkBoxesColor.length; i++) {
            if (checkBoxesColor[i] !== checkThis) {
                checkBoxesColor[i].checked = false
            }
        }
        if (checkBoxesColor[0].checked == true) setColor("#ff00ff");
        else if (checkBoxesColor[1].checked == true) setColor("#ff0000");
        else if (checkBoxesColor[2].checked == true) setColor("#00ff00");
        else if (checkBoxesColor[3].checked == true) setColor("#0000ff");
    }

    return(
        <React.Fragment>
            <div id ='settingcontainer'>
                <ImageContainer color={color} avatar={avatar} />
                
                <div style={{width: '33%'}}>
                    <Status /><br />
                    <div style={{fontSize: '24px', height: 'auto'}}>
                        2. 아바타: {name}<br />
                        <div style={{fontSize: '20px'}}>
                            {Object.entries(avtDict).map(([key, value]) => 
                                <div>
                                    <input type='checkbox' name='avatar' value={key} onChange={(e) => {
                                        for (let i = 0; i < checkBoxesAvatar.length; i++) {
                                            if (checkBoxesAvatar[i] !== e.target) {
                                                checkBoxesAvatar[i].checked = false
                                            } else {
                                                setAvatar(value);
                                                setName(key);
                                            }
                                        }
                                    }}/>
                                    <label>{key}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <br />
                    <div style={{fontSize: '24px', height: 'auto'}}>
                        3. 배경색: {color}<br />
                        <input
                            type='color'
                            value={color}
                            onChange={onColorChange}
                            style={{width: '100%'}}
                        />
                        <div style={{fontSize: '20px'}}>
                            <input type='checkbox' name='color' value='HotPink' onChange={(e) => checkOnlyOneColor(e.target)}/>
                            <label>마젠타</label><br />
                            <input type='checkbox' name='color' value='Red' onChange={(e) => checkOnlyOneColor(e.target)}/>
                            <label>빨강</label><br />
                            <input type='checkbox' name='color' value='Green' onChange={(e) => checkOnlyOneColor(e.target)}/>
                            <label>초록</label><br />
                            <input type='checkbox' name='color' value='Blue' onChange={(e) => checkOnlyOneColor(e.target)}/>
                            <label>파랑</label>
                        </div>
                    </div>
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

    const handleButtonClick = () => { 
        Swal.fire('기기 본체의 리셋 버튼을 누른 뒤, T 자세로 30초간 기다려주세요.').then(e=>{});
    };
    useEffect(() => {
        handleButtonClick();
    }, []);

    return(
        <React.Fragment>
            <NavHead name = {name}></NavHead>
            <SettingContainer />
        </React.Fragment>
    )
}

export default Device;