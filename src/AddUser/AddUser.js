import styles from './AddUser.module.css';

const saveJson = (name) => {

  let userObj = {};

  userObj = {
    name : name
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
        // const list3 = [20,20,20,20,20,44,20]
        // const addresslist = ['aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaa']
        //test
        //console.log(username);
        //input data 
        saveJson(username)
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