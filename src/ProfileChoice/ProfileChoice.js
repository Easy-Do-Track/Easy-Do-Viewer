import React, { useEffect } from 'react';
import './ProfileChoice.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddUser from '../AddUser/AddUser'

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

const Profiles = (props) =>{
  
  // window.localStorage.clear()
  
  const keys = Object.keys(window.localStorage)
  const [dname, delname] = useState('')
  const [names,setNames] = useState(keys)
  //const [v,delname] = useState('')

  const addName = (name) =>{
    setNames([...names,name])
  }

  const deleteJson = (idx,name) => {
    const temp = [...names]
    window.localStorage.removeItem(name);
    
    temp.splice(idx, 1)
    setNames(temp)
  };

  const profiles = names.map(
    (v,i) => (
      <div>
        <Link to ='/Device' key={v} state ={{name:v}} style={{ textDecoration: "none" }}>
          <Profile  addName = {addName} name ={v}></Profile>
        </Link>
        <button className="closebutton"  state ={{name:v}} onClick={()=> {deleteJson(i,v)}}>
          X
        </button>
      </div>
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
  const showModal = () => {
    setModalOpen(true);
  };
  
  return(
    <React.Fragment>
      <div className='profile' onClick={()=>showModal()} onMouseEnter={()=> setHide(false)} >{
        props.name === "empty" 
        ?  <h3 className="plusicon">+</h3>
        :  <h3 className='profiletitle'>{props.name}</h3>
      }      
      </div>
      {
        props.name === "empty" ? modalOpen && <AddUser addName = {props.addName} ssetModalOpen={setModalOpen}/> : null
      }
    </React.Fragment>
  )
}

const ProfileChoice = () =>{
  return(
    <React.Fragment>
      <NavHead></NavHead>
      <Profiles></Profiles>
    </React.Fragment>
  )
}
export default ProfileChoice;