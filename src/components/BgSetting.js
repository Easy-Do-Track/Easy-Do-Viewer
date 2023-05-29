import React, { useState } from 'react';

function BgSetting(props) {
    const [data, setData] = useState("#ffffff");
    const checkboxes = document.getElementsByName('color')

    const onChange = (e) => {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }
        setData(e.target.value);
        props.setColor(data);
    }

    const checkOnlyOne = (checkThis) => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
        if (checkboxes[0].checked == true) setData("#ff69b4");
        else if (checkboxes[1].checked == true) setData("#ff0000");
        else if (checkboxes[2].checked == true) setData("#00ff00");
        else if (checkboxes[3].checked == true) setData("#0000ff");
        props.setColor(data);
    }

    return (
        <div style={{fontSize: '24px', height: 'auto'}}>
            3. 배경색: {data}<br />
            <input
                type='color'
                value={data}
                onChange={onChange}
                style={{width: '100%'}}
            />
            <div style={{fontSize: '20px'}}>
                <input type='checkbox' name='color' value='HotPink' onChange={(e) => checkOnlyOne(e.target)}/>
                <label>핫핑크</label><br />
                <input type='checkbox' name='color' value='Red' onChange={(e) => checkOnlyOne(e.target)}/>
                <label>빨강</label><br />
                <input type='checkbox' name='color' value='Green' onChange={(e) => checkOnlyOne(e.target)}/>
                <label>초록</label><br />
                <input type='checkbox' name='color' value='Blue' onChange={(e) => checkOnlyOne(e.target)}/>
                <label>파랑</label>
            </div>
        </div>
    );
}

export default BgSetting;