import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './css/Login.module.css';
import { Link } from 'react-router-dom';
import MenuContents from '../../Menu/Contents/MenuContents';

export default function LoginContents() {



  return (
    <div className={styles.page}>
      <MenuContents />
      <div className={styles.body}>

        <div className={styles.container}>
          <Helmet>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
          </Helmet>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.txt_box}>
            <input type="text" placeholder="아이디를 입력해주세요" />
            <i className='bx bx-user-circle'></i>
          </div>
          <div className={styles.txt_box}>
            <input type="password" placeholder="패스워드를 입력해주세요" />
            <i className='bx bxs-lock-alt' />
          </div>
          <div className={styles.chk_bar}>
            <label><input type="checkbox" />이 계정 기억하기</label>
            <a href="#">비밀번호 찾기</a>
          </div>
          <button type="submit" className={styles.btn_login}>Login</button>
          <div className={styles.register_bar}>
            <p>계정을 가지고 있지 않나요? <Link to='/register'>회원가입</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}