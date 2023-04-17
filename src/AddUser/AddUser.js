import styles from './AddUser.module.css';
import closeModalEvent from '../ProfileChoice/ProfileChoice'


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

const AddUser = (props)=>{
    // 모달 끄기 

    
    const closeModal = () => {
        props.ssetModalOpen(false);
    };

    const inputName = () => {
        const username = document.getElementById("name").value; 
        const list3 = [20,20,20,20,20,44,20]
        const addresslist = ['aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa']
        //test
        //console.log(username);
        //input data 
        saveJson(username,addresslist,list3)
        props.addName(username);        
        props.ssetModalOpen(false);
        
        
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <button className={styles.inputbtn} onClick={() => {inputName();}}>Enter</button>
            <input id="name" className = {styles.input}/>
            <p className= {styles.modaltext}>추가할 유저 이름을 입력해주세요.</p>
        </div>
    );
}
export default AddUser;