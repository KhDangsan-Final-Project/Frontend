import styles from "../css/BoardList.module.css"
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import FooterImg from "../../Menu/Footer/FooterImg";
import Footer from "../../Menu/Footer/Footer";


export default function BoardNotice() {
    const [boardList, setBoardList] = useState([]);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [pageContentEa, setPageContentEa] = useState(15);
    const [pagging, setPagging] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        async function fetchBoardList() {
            try {
                const response = await axios.get("https://teeput.synology.me:30112/ms1/board/list", {
                    params: {
                        pageNo: pageNo,
                        pageContentEa: pageContentEa,
                        category: "공지사항"
                    }
                });
                setBoardList(response.data.boards);
                setPagging(response.data.pagging);
            } catch (err) {
                setError(err);
            }
        }
        fetchBoardList();
    }, [pageNo, pageContentEa]);
    if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다!</div>;

    const pages = Array.from(
        { length: pagging.endPageOfPageGroup - pagging.startPageOfPageGroup + 1 },
        (_, i) => pagging.startPageOfPageGroup + i
    );

    const handlePreviousPageGroup = () => {
        if (pagging.previousPageGroup && pageNo > 1) {
            setPageNo(pagging.startPageOfPageGroup - 1);
        }
    };

    const handleNextPageGroup = () => {
        if (pagging.nextPageGroup) {
            setPageNo(pagging.endPageOfPageGroup + 1);
        }
    };

    return (
        <div className={styles.bigContainer}>
            <div className={styles.jump} />
            <h1 className={styles.title}>공지사항</h1>
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>작성일</th>
                        </tr>
                        <tr>
                            <th colSpan="5"><hr className={styles.hrHeadLine} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map(board => (
                            <React.Fragment key={board.boardNo}>
                                <tr>
                                    <td>{board.boardNo}</td>
                                    <td><Link to={`/boardContent/${board.boardNo}`} className={styles.link}> {board.boardTitle}</Link></td>
                                    <td>{board.id}</td>
                                    <td>{board.boardCount}</td>
                                    <td>{new Date(board.boardWrite).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5"><hr className={styles.hrLine} /></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                    <tfoot className={styles.page}>
                        <tr>
                            <td colSpan={5}>
                                {pagging.startPageOfPageGroup > 1 && (
                                    <a onClick={handlePreviousPageGroup}>◀</a>
                                )}
                                {pages.map(page => (
                                    <a key={page} onClick={() => setPageNo(page)}>
                                        {page}
                                    </a>
                                ))}
                                {pagging.nextPageGroup && (
                                    <a onClick={handleNextPageGroup}>▶</a>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className={styles.jump} />
            <FooterImg />
            <Footer />
        </div>
    );
}