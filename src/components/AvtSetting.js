import React, { useState } from 'react';

function AvtSetting(props) {
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

    const [data, setData] = useState("mmd/Model/Miku_Hatsune.pmd");
    const [name, setName] = useState("하츠네 미쿠");

    const checkboxes = document.getElementsByName('avatar')

    return (
        <div style={{fontSize: '24px', height: 'auto'}}>
            2. 아바타: {name}<br />
            <div style={{fontSize: '20px'}}>
                {Object.entries(avtDict).map(([key, value]) => 
                    <div>
                        <input type='checkbox' name='avatar' value={key} onChange={(e) => {
                            for (let i = 0; i < checkboxes.length; i++) {
                                if (checkboxes[i] !== e.target) {
                                    checkboxes[i].checked = false
                                } else {
                                    setData(value);
                                    setName(key);
                                }
                            }
                            props.setAvatar(data);
                        }}/>
                        <label>{key}</label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AvtSetting;