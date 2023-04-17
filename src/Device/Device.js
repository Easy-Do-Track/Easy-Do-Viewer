import React from 'react';
import ReactDOM from 'react-dom/client';
import './Device.css';
import { Link, useLocation } from "react-router-dom";
import image from '../assets/a.png'


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

const SettingContainer = (props) =>{
    return(
        <React.Fragment>
            <div id ='settingcontainer'>
                <ImageContainer></ImageContainer>

                <AddressContainer name = {props.name}></AddressContainer>

            </div>
        </React.Fragment>
    )

}

const AddressContainer = (props) =>{

    const userString = window.localStorage.getItem(props.name);
    const userJson = JSON.parse(userString)
    const addresslist = userJson.address;

    const physicaladdress = Object.keys(addresslist).map((key) => (
        <PhysicalAddress number = {key} address = {addresslist[key]} connect = "True"></PhysicalAddress>
    )); 

    console.log("adress",addresslist) 

    return(
        <React.Fragment>
        <div className = 'addresscontainer'>
            
            {/* <PhysicalAddress number = "1" address = "ㅁㅁ-ㅁㅁ-ㅁㅁ-ㅁㅁ-ㅁ ㅁ" connect = "True"></PhysicalAddress>
            <PhysicalAddress number = "2" address = "AA-bb-cc-dd-ee" connect = "True"></PhysicalAddress>
            <PhysicalAddress number = "3" address = "AA-bb-cc-dd-ee" connect = "false"></PhysicalAddress>
             */}
            {physicaladdress}
            <CrudContainer name = {props.name}></CrudContainer>


        </div>
    </React.Fragment>

    )
}

const PhysicalAddress = (props) =>{
    const connect = props.connect
    const color = connect == "True" ? 'green' : 'red' 


    return(
        <div className='physicaladdress'>
            <span style={{"background-color":color ,"color":"white"}}>{connect == "True"?'연결됨':'연결해제'}</span> 
            <span>{props.number}</span> <input defaultValue={props.address}></input>    
            <button id = "deletebutton">[삭제]</button>
        </div>
    )

}

const saveAdress = (name) =>{
    
    const inputs = document.querySelectorAll(".physicaladdress>input")

    const addresses = [];
    for(let i = 0;i<inputs.length;i++){
        const input = inputs[i];
        addresses.push(input.value);
    }

    const userString = window.localStorage.getItem(name);
    const userJson = JSON.parse(userString);
    const userAddress = userJson.address

    userJson.address = addresses
    const userStringForSet = JSON.stringify(userJson)
    window.localStorage.setItem(name,userStringForSet)

    const a = window.localStorage.getItem(name);
    console.log("userstring",a)
}

const CrudContainer = (props) =>{
    const data = {
        name : props.name
    };

    return(
        <React.Fragment>
        <div id = "crudcontainer">
            <button onClick={() => saveAdress(data.name)}>[저장]</button>
            <Link to = '/Setting' state={{data}} ><button>[수동설정]</button></Link>
            <button>[자동설정]</button>
        </div>
        </React.Fragment>
    )

}

const ImageContainer = () =>{
    return(
        <React.Fragment>
            <div id = 'imagecontainer'>
                <img src = {image} alt = 'status'></img>
                
            </div>
        </React.Fragment>
    )
}

const Device = () =>{
    const location = useLocation();
    const name = location.state.name;
    return(
        <React.Fragment>
            <NavHead name = {name}></NavHead>
            <SettingContainer name = {name}></SettingContainer>
        </React.Fragment>
    )

}

export default Device;