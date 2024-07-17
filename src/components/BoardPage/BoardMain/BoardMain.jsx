import styles from './css/BoardMain.module.css'
import { Link } from 'react-router-dom'

export default function BoardMain() {

    function write(){

    }

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <div className={styles.button}>
                    <button>공지사항</button>
                    <button>이벤트</button>
                </div>
                <Link to={'#'}>더보기</Link>
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
            <div className={styles.side}>
                <div className={styles.write}>
                    <button className={styles.writeBtn} onClick={write}>글쓰기</button>
                </div>
                <div className={styles.notice}>
                    <h3>포켓몬 카드 커뮤니티 에티켓</h3>
                    <hr />
                    <h5>'포켓몬 카드' 커뮤니티에 오신 것을 환영합니다.</h5><br />
                    <h5>'포켓몬 카드' 게임을 사랑하는 모든 분들의 공간이며 서로 즐겁고 도움이 될 수 있도록 도와주세요.</h5>
                    <hr />
                    <p>
                        1. '포켓몬 카드’ 게임과 관련된 글을 올려주세요.<br />
                        2. 개인 공격은 서로 상처가 됩니다.<br />
                        3. 개인 정보(전화번호, email, 계정 등)를 노출하시면 위험해요.<br />
                        4. 광고글과 사기글, 지나치게 폭력적이고 성적인 콘텐츠는 예고 없이 삭제됩니다.</p>
                </div>
            </div>
        </div>
    )
}