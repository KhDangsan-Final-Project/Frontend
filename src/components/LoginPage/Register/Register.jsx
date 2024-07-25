import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useNavigate를 가져옵니다.
import styles from './css/Register.module.css';
import axios from 'axios';

export default function Register( {showLogin} ) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('naver.com');
    const [nickname, setNickname] = useState('');
    const [idValid, setIdValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [idCheckStatus, setIdCheckStatus] = useState(true);

    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

    function checkId(id) {
        let reg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
        return reg.test(id);
    }

    function checkPassword(password) {
        let reg = /(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]{7,32}$/;
        return reg.test(password);
    }

    function handleNameChange(e) {
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

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleEmailDomainChange(e) {
        setEmailDomain(e.target.value);
    }

    function handleNicknameChange(e) {
        setNickname(e.target.value);
    }

    

    
    const handleIdCheck = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://teeput.synology.me:30112/ms3/user/idcheck", JSON.stringify({ id }), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            });
            if (response.data.count > 0) {
                alert("아이디가 존재합니다. 다른 아이디를 입력해주세요.");
                setIdCheckStatus(false);
            } else {
                alert("사용가능한 아이디입니다.");
                setIdCheckStatus(true);
            }
        } catch (error) {
            alert("Error: " + error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idValid || !passwordValid || !passwordMatch || idCheckStatus === false) {
            return;
        }
        const formData = JSON.stringify({
            name,
            id,
            password,
            email: `${email}@${emailDomain}`,
            nickname
        });

        try {
            const response = await fetch("http://localhost:8090/ms3/user/insert", {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                credentials: 'include'
            });
            const result = await response.json();
            console.log(result);
            if (result.result) {
                navigate('/');
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <header>
            <div className={styles.page}>
                <div className={styles.body}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Sign-in</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.id}>
                                <input type="text" value={id} onChange={handleIdChange} placeholder="아이디를 입력해주세요" />
                                <button type='button' onClick={handleIdCheck}>중복확인</button>
                            </div>
                            <span className={`${styles.error} ${idValid ? styles.hidden : styles.visible}`}>
                                *아이디는 8글자 이상 20자 이하로 알파벳 숫자 조합으로 입력하세요
                            </span>
                            <div className={styles.password}>
                                <input type="password" value={password} onChange={handlePasswordChange} placeholder="패스워드를 입력해주세요" />
                            </div>
                            <span className={`${styles.error} ${passwordValid ? styles.hidden : styles.visible}`}>
                                *암호는 숫자, 특수문자 1글자씩 포함되어야합니다. 8~32글자 사이로 입력하세요
                            </span>
                            <div className={styles.password}>
                                <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="패스워드 확인" />
                            </div>
                            <span className={`${styles.error} ${passwordMatch ? styles.hidden : styles.visible}`}>
                                *암호가 일치하지 않습니다.
                            </span>
                            <div className={styles.email}>
                                <div className={styles.email_box}>
                                    <input type="text" value={email} onChange={handleEmailChange} placeholder="이메일을 입력해주세요" />
                                </div>
                                <div className={styles.email_option}>
                                    <select name="emailDomain" value={emailDomain} onChange={handleEmailDomainChange}>
                                        <option value="naver.com">naver.com</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="icloud.com">icloud.com</option>
                                        <option value="kakao.com">kakao.com</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.name}>
                                <input type="text" value={name} onChange={handleNameChange} placeholder="성함을 입력해주세요" />
                            </div>
                            <div className={styles.nick}>
                                <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="닉네임을 입력해주세요" />
                            </div>
                            <button type="submit" id="submit" className={styles.btn_submit}>Submit</button>
                            <button type="reset" className={styles.btn_cancel} onClick={showLogin}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}
