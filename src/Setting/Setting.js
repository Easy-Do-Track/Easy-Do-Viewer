import React from 'react';
import ReactDOM from 'react-dom/client';
import './Setting.css';
import { Link, useLocation } from "react-router-dom";
import image from '../assets/human.jpg'
const NavHead = (props) =>{
    // const location = useLocation();
    // const data = location.state.data;
    return(
        <div id ="navhead">
            <h1 id = "title">센서간 길이 수동 설정</h1>
            <hr/>
            <p id = "username">{props.name}</p>
        </div>
    )

}

const ImageContainer = () => {
    return(
        <div id = "imagecontainer">
            <img src = {image} alt='human'></img>
        </div>
    )
}

const SettingFormContainer = (props) => {
    const name = props.name
    const userString = window.localStorage.getItem(name);
    const userObj = JSON.parse(userString)
    const parts = ['팔목 - 어깨 ',"어깨길이 ","가슴 - 골반 ","골반 길이 ","골반 - 허벅지 ","허벅지 - 발목 ","발목 - 발 "]
    const settings = userObj.setting
    const valueslist = []
    const realuse = []
    for(let i in settings){
        valueslist.push(settings[i])
    }

    for(let i = 0;i<valueslist.length;i++){
        const tmp = []
        tmp.push(parts[i])
        tmp.push(valueslist[i])
        realuse.push(tmp)
    }

    const settingForms = realuse.map((v) => (<SettingForm label = {v[0]} value = {v[1]}></SettingForm>))
    return(
        <React.Fragment>
            
            <div id = "settingformcontainer">
                {/* <SettingForm label = "팔목 - 어깨 " value = '1'></SettingForm>
                <SettingForm label = "어깨길이 " value = '2'></SettingForm>
                <SettingForm label = "가슴 - 골반 " value = '3'></SettingForm>
                <SettingForm label = "골반 길이 " value = '4'></SettingForm>
                <SettingForm label = "골반 - 허벅지 " value = '5'></SettingForm>
                <SettingForm label = "허벅지 - 발목 " value = '6'></SettingForm>
                <SettingForm label = "발목 - 발 " value = '7'></SettingForm> */}
                {settingForms}
                
                
            </div>
            
        </React.Fragment>

    )
}


const SettingForm = (props) => {
    return(
        <React.Fragment>
            <div className='settingform'>   
                <form>
                        <strong className='label'>{props.label}</strong>
                        <strong className='cm'>cm</strong>
                        <input type='text' defaultValue={props.value}></input>
                </form>
            </div>
        </React.Fragment>
    )
}

const buttonEvent =  (name) => {
    const inputs = document.querySelectorAll('.settingform>form>input');
    const valuelist = [];
    for(let i = 0;i<inputs.length;i++){
        const input = inputs[i];
        valuelist.push(input.value);
    }
    
    const fff = JSON.parse(window.localStorage.getItem(name));
    console.log("dd",fff.address)
    //JSON 데이터 만들고 문자열로 변환
    const userObj = {
        name : name,
        address : fff.address, 
        setting : {
          "wrist-shoulder" : valuelist[0],
          "shoulder-length" : valuelist[1],
          "chest-pelvis" : valuelist[2],
          "pelvis-length" : valuelist[3],
          "pelvis-thigh" : valuelist[4],
          "thigh-ankle" : valuelist[5],
          "ankle-foot" : valuelist[6]
        } 
      }
    
    const userJson = JSON.stringify(userObj)
    window.localStorage.setItem(name, userJson);

    const userString = window.localStorage.getItem(name);
    console.log("userstring",userString)

}
const SettingButton = (props) =>{

    return(
        <React.Fragment>
            <div id = 'settingbutton'>
                <button onClick={() =>buttonEvent(props.name)}>저장</button>
            </div>
        </React.Fragment>
    )
}
const SelfSettingContainer = (props) =>{

    return(
        <React.Fragment>
            <div id = "selfsettingcontainer">
                <ImageContainer></ImageContainer>
                <SettingFormContainer name = {props.name}></SettingFormContainer>
            </div>
        </React.Fragment>
    )
}



const Setting = () =>{
    const location = useLocation();
    const data = location.state.data;
    return(
        <React.Fragment>
            <NavHead name = {data.name}></NavHead>
            <SelfSettingContainer name = {data.name}></SelfSettingContainer>
            <SettingButton name = {data.name}></SettingButton>
        </React.Fragment>
    )

}

export default Setting;