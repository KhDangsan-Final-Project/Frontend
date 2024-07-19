import styles from './css/BoardMain.module.css'
import { Link } from 'react-router-dom'

export default function BoardMain({ showWrite }) {

    const write = () => {
        showWrite();
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
                    <button className={styles.writeBtn} onClick={write}>글쓰기</button>
                </div>
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