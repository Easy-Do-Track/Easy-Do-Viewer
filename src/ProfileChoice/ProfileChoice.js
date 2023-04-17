import React, { useEffect } from 'react';
import './ProfileChoice.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddUser from '../AddUser/AddUser'

const saveJson = (name,addresslist,valuelist) => {

  let userObj = {};

  //default값 설정하는곳
  if(valuelist === '0' && addresslist==='0'){
    userObj = {
      name : name,
      address : {
        "sensor-1" : 'aa-aa-aa-aa-aa',
        "sensor-2" : 'aa-aa-aa-aa-aa',
        "sensor-3" : 'aa-aa-aa-aa-aa',
        "sensor-4" : 'aa-aa-aa-aa-aa',
        "sensor-5" : 'aa-aa-aa-aa-aa',
        "sensor-6" : 'aa-aa-aa-aa-aa',
        "sensor-7" : 'aa-aa-aa-aa-aa',
        "sensor-8" : 'aa-aa-aa-aa-aa',
        "sensor-9" : 'aa-aa-aa-aa-aa',
        "sensor-10" : 'aa-aa-aa-aa-aa',
        "sensor-11" : 'aa-aa-aa-aa-aa',
        "sensor-12" : 'aa-aa-aa-aa-aa',
    },
      setting : {
        "wrist-shoulder" : "1",
        "shoulder-length" : "2",
        "chest-pelvis" : "3",
        "pelvis-length" : "4",
        "pelvis-thigh" : "5",
        "thigh-ankle" : "9",
        "ankle-foot" : "7"
      } 
    }
  }

  else{
    userObj = {
      name : name,
      address : {
          "sensor-1" : addresslist[0],
          "sensor-2" : addresslist[1],
          "sensor-3" : addresslist[2],
          "sensor-4" : addresslist[3],
          "sensor-5" : addresslist[4],
          "sensor-6" : addresslist[5],
          "sensor-7" : addresslist[6],
          "sensor-8" : addresslist[7],
          "sensor-9" : addresslist[8],
          "sensor-10" : addresslist[9],
          "sensor-11" : addresslist[10],
          "sensor-12" : addresslist[11],
      },
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
  }



  //check
  const userString = JSON.stringify(userObj);
  window.localStorage.setItem(name, userString);

  const checkuser = window.localStorage.getItem(name);
  //console.log("checkuser");

  const userJson = JSON.parse(checkuser)
  //console.log("Json" ,userJson)

}






const NavHead = () =>{
  return(
    <React.Fragment>
      <div id = "bar">
        <h1 id = "profilechoice">프로필 선택</h1>
        <hr/>
      </div>
    </React.Fragment>
  )
}


const closeModalEvent = () =>{
  console.log('sss')
}

const Profiles = () =>{
  
  // window.localStorage.clear()
  
  const keys = Object.keys(window.localStorage)
  const [names,setNames] = useState(keys)
  
  const addName = (name) =>{
    setNames([...names,name])
  }
  
  const testf =()=>{
    console.log("sss")
  }

  const profiles = names.map(
    (v) => (
    <Link to ='/Device' key={v} state ={{name:v}} style={{ textDecoration: "none" }}>
      <Profile  addName = {addName} name ={v}></Profile>
    </Link>
    )
  )
  
  return(
    <React.Fragment>
      <p id="teamName">Easy Do Track</p>
      <h2 id = "phrase"> 누가 사용하나요?</h2>
      <div className = "profiles">
        {profiles}
        <Profile  addName = {addName} name = "empty"></Profile>

      </div>
    </React.Fragment>
  )
}



const Profile = (props) =>{

  const [modalOpen, setModalOpen] = useState(false);
  const [hide, setHide] = useState(true);
  //const [closebtn, setbtn] = useState(false);
  const [btnX, setbtnX] = useState(false);
  const [name, delname] = useState('');
  const showModal = () => {
    setModalOpen(true);
  };
  

    const deleteJson = (name) => {
      window.localStorage.removeItem(name);
    };

    
    return(
      <React.Fragment>
        <div className='profile' onClick={()=>showModal()} onMouseEnter={()=> setHide(false)} >{
          props.name === "empty" 
          ?  <h3 className="plusicon">+</h3>
          :  <h3 className='profiletitle'>{props.name}</h3>
        }      
        </div>
        <button className="closebutton" onClick={()=> {deleteJson(name)}}>
          X
        </button>
        {
          props.name === "empty" ? modalOpen && <AddUser addName = {props.addName} ssetModalOpen={setModalOpen}/> : null
        }
      </React.Fragment>
    )
  }

/*
var ProfileChoice = () =>{

  //확인용 data들 
  //check saveJson method 사용법
  const list = [20,20,20,20,20,44,20]
  saveJson("이석희",list)

  const list2 = [10,20,30,40,50,60,70]
  saveJson("제로콜라",list2)
  
  saveJson("treesrt",'0')
  return(
    <React.Fragment>
      <NavHead></NavHead>
      <Profiles></Profiles>
    </React.Fragment>
  )
}
export default ProfileChoice;
*/

const ProfileChoice = () =>{

  //확인용 data들 
  //check saveJson method 사용법
  const list = [20,20,20,20,20,44,20]
  const addresslist = ['aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa']
  
  const addresslist2 = ['aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa']
  const list2 = [10,20,30,40,50,60,70]
  
  
  if(window.localStorage.getItem('이석희')===null){
    saveJson("이석희",addresslist,list)
  }
  if(window.localStorage.getItem('treeset')===null){
    saveJson("treeset",'0','0')
  }

  return(
    <React.Fragment>
      <NavHead></NavHead>
      <Profiles></Profiles>
    </React.Fragment>
  )
}
export default ProfileChoice;