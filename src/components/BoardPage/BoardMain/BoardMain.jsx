import styles from './css/BoardMain.module.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

export default function BoardMain({ showWrite, token }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const write = () => {
        showWrite();
    };

    useEffect(() => {
        console.log('BoardMain token:', token);
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [token]);


    const alertMsg = () =>{
        alert("로그인 후 이용해주시기 바랍니다.");
      };

    return (
        <div className={styles.container}>
            <div className={styles.button}>
                <button className={styles.notice}>공지사항</button>
                <button className={styles.event}>이벤트</button>
            </div>
            <div className={styles.option}>
                <Link to={'/boardList'} className={styles.moreView}>더보기</Link>
                <div className={styles.write}>
                {isLoggedIn ? (
                        <button className={styles.writeBtn} onClick={write}>글쓰기</button>
                    ) : (
                        <button className={styles.writeBtn}  onClick={alertMsg}><Link to="/login">글쓰기</Link></button>
                    )}</div>
            </div>
            <hr />
            <section>
                <article>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                </article>
                <hr />
                <article>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                </article>
                <hr />
                <article>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                </article>
                <hr />
                <article>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                    <ul>
                        <h5>제목</h5>
                        <li>
                            <img src='/img/pokeball.png' /><span>작성자</span>
                            &nbsp;
                            <img src='/img/eye.png' /><span>123</span>
                            &nbsp;
                            <span>작성일</span>
                        </li>
                    </ul>
                </article>
                <hr />
            </section>
        </div>
    )
}