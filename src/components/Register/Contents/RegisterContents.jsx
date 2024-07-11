import React, { useState } from 'react';
import styles from './css/Register.module.css';
import MenuContents from '../../Menu/Contents/MenuContents';

export default function RegisterContents() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [idValid, setIdValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    function checkId(id) {
        let reg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
        return reg.test(id);
    }

    function checkPassword(password) {
        let reg = /(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]{7,32}$/;
        return reg.test(password);
    }

    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleIdChange(e) {
        setId(e.target.value);
        setIdValid(checkId(e.target.value));
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setPasswordValid(checkPassword(e.target.value));
    }

    function handlePasswordCheckChange(e) {
        setPasswordCheck(e.target.value);
        setPasswordMatch(e.target.value === password);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!idValid || !passwordValid || !passwordMatch) {
            return;
        }
        const formData = JSON.stringify({ name,id, password });

        
        fetch("http://192.168.20.2:8090/ms3/user/insert", {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result =>{
            console.log(result);
        })
        .catch(error =>
            console.error('Error:', error));
            
        }



return (
    <div className={styles.page}>
        <MenuContents />
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Sign-in</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.name}>
                        <input type="text" value={name} onChange={handleNameChange} placeholder="성함을 입력해주세요" />
                    </div>
                    <div className={styles.name}>
                        <input type="text" value={id} onChange={handleIdChange} placeholder="아이디를 입력해주세요" />
                    </div>
                    {!idValid && <span className={styles.error}>*아이디는 8글자 이상 20자 이하로 알파벳 숫자 조합으로 입력하세요</span>}
                    <div className={styles.txt_box}>
                        <input type="password" value={password} onChange={handlePasswordChange} placeholder="패스워드를 입력해주세요" />
                    </div>
                    {!passwordValid && <span className={styles.error}>*암호는 숫자, 특수문자 1글자씩 포함되어야합니다.8~32글자 사이로 입력하세요</span>}
                    <div className={styles.txt_box}>
                        <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="패스워드 확인" />
                    </div>
                    {!passwordMatch && <span className={styles.error}>*암호가 일치하지 않습니다.</span>}
                    <div className={styles.email}>
                        <div className={styles.email_box}>
                            <input type="text" placeholder="이메일을 입력해주세요" />
                        </div>
                        <div className={styles.email_option}>
                            <select name="email">
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="icloud.com">icloud.com</option>
                                <option value="kakao.com">kakao.com</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.nick}>
                        <input type="text" placeholder="닉네임을 입력해주세요" />
                    </div>
                    <button type="submit" className={styles.btn_submit} id='submit'>Submit</button>
                    <button type="reset" className={styles.btn_cancel}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
);
}
