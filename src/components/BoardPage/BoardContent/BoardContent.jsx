import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/BoardContent.module.css'
import FooterImg from '../../Menu/Footer/FooterImg';
import Footer from '../../Menu/Footer/Footer';
import DOMPurify from 'dompurify';

export default function BoardContent() {
    const { boardNo } = useParams();
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [files, setFiles] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]); // 이미 빈 배열로 설정됨
    const [commentLikeCounts, setCommentLikeCounts] = useState({});
    const [commentHateCounts, setCommentHateCounts] = useState({});
    const [commentLiked, setCommentLiked] = useState({});
    const [commentHated, setCommentHated] = useState({});
    const [userId, setUserId] = useState('');
    const [userProfile, setUserProfile] = useState('');

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {

        async function fetchBoard() {
            try {
                //조회수 증가
                await increaseViewCount();

                //boardNo에 맞는 게시물 조회
                const response = await axios.get(`https://teeput.synology.me:30112/ms1/board/${boardNo}`);
                setBoard(response.data);
                // 현재 로그인한 사용자 ID 가져오기
                const userResponse = await axios.get('https://teeput.synology.me:30112/ms1/currentUser', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                setUserId(userResponse.data.id);
                setUserProfile(userResponse.data.profile);

                //좋아요 상태 및 수 확인
                const likeResponse = await axios.get(`https://teeput.synology.me:30112/ms1/boardLikeView/${boardNo}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                setLiked(likeResponse.data.liked);
                setLikeCount(likeResponse.data.count);

                //댓글 목록 조회
                fetchComments();

                // 파일 목록 조회
                fetchFiles();
            } catch (err) {
                setError(err);
            }
        }

        fetchBoard();

    }, [boardNo, token]);

    //파일 조회
    async function fetchFiles() {
        try {
            const response = await axios.get(`https://teeput.synology.me:30112/ms1/board/fileList/${boardNo}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFiles(response.data || []);

        } catch (err) {
            console.error('파일 목록을 불러오는 중 오류가 발생했습니다.', err);
        }
    }

    //게시물 조회수
    async function increaseViewCount() {
        try {
            await axios.post(`https://teeput.synology.me:30112/ms1/boardViewCount/${boardNo}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        } catch (err) {
            console.error('Error: ', err);
            setError(err);
        }

    }

    //게시물 좋아요
    async function buttonLike() {
        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/boardLike/${boardNo}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.code === 1) {
                setLiked(prevLiked => !prevLiked);
                setLikeCount(response.data.count);
            } else {
                console.error("Error: ", response.data.msg);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err);
        }
    }

    //댓글 등록
    async function submitComment(e) {
        e.preventDefault();
        if (!commentText.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/comment/insert/${boardNo}`, new URLSearchParams({
                comment: commentText
            }), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                alert('댓글 작성 성공');
                setCommentText('');
                fetchComments(); // 댓글 목록 업데이트
            } else {
                alert('댓글 작성 실패: ' + response.data);
            }
        } catch (err) {
            console.error('error: ', err);
            alert('댓글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }

    //댓글목록조회
    async function fetchComments() {
        try {
            const response = await axios.get(`https://teeput.synology.me:30112/ms1/comments/${boardNo}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(response.data || []);

            const likeStatus = {};
            const hateStatus = {};

            const likeStatusRequests = response.data.map(comment =>
                axios.get(`https://teeput.synology.me:30112/ms1/boardCommentLikeView/${comment.cno}/${boardNo}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(likeResponse => {
                    likeStatus[comment.cno] = likeResponse.data.liked;
                    setCommentLikeCounts(prev => ({ ...prev, [comment.cno]: likeResponse.data.count }));
                })
            );

            const hateStatusRequests = response.data.map(comment =>
                axios.get(`https://teeput.synology.me:30112/ms1/boardCommentHateView/${comment.cno}/${boardNo}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(hateResponse => {
                    hateStatus[comment.cno] = hateResponse.data.hated;
                    setCommentHateCounts(prev => ({ ...prev, [comment.cno]: hateResponse.data.count }));
                })
            );

            await Promise.all([...likeStatusRequests, ...hateStatusRequests]);

            setCommentLiked(likeStatus);
            setCommentHated(hateStatus);
        } catch (err) {
            console.error('댓글 목록을 불러오는 중 오류가 발생했습니다.', err);
        }
    }
    //댓글 좋아요
    async function buttonCommentLike(cno) {
        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/commentLike/${cno}/${boardNo}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.code === 1) {
                setCommentLiked(prev => ({ ...prev, [cno]: !prev[cno] }));
                setCommentLikeCounts(prev => ({
                    ...prev,
                    [cno]: response.data.count
                }));
            } else {
                console.error("Error: ", response.data.msg);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err);
        }
    }

    //댓글 싫어요
    async function buttonCommentHate(cno) {
        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/commentHate/${cno}/${boardNo}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.code === 1) {
                setCommentHated(prev => ({ ...prev, [cno]: !prev[cno] }));
                setCommentHateCounts(prev => ({
                    ...prev,
                    [cno]: response.data.count
                }));
            } else {
                console.error("Error: ", response.data.msg);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err);
        }
    }

    // 게시물 삭제
    async function deleteBoard() {
        try {
            const response = await axios.delete(`https://teeput.synology.me:30112/ms1/board/delete/${boardNo}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (response.status === 200) {
                alert('게시글이 삭제되었습니다.');
                navigate('/boardList'); // 게시물 목록 페이지로 리디렉션
            } else {
                alert('게시글 삭제 실패: ' + response.data);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                // 삭제할 권한이 없을 때의 처리
                alert('삭제할 권한이 없습니다.');
            } else {
                // 기타 오류 처리
                alert('댓글 삭제 중 오류가 발생했습니다: ' + (err.response ? err.response.data : '서버와의 연결이 끊어졌습니다.'));
            }
        }
    }

    //댓글 삭제
    async function deleteComment(cno) {
        try {
            const response = await axios.delete(`https://teeput.synology.me:30112/ms1/boardCommentDelete/${cno}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                alert('댓글이 삭제되었습니다.');
                setComments(prevComments => prevComments.filter(comment => comment.cno !== cno));
            } else {
                alert('댓글 삭제 실패: ' + response.data);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                // 삭제할 권한이 없을 때의 처리
                alert('삭제할 권한이 없습니다.');
            } else {
                // 기타 오류 처리
                alert('댓글 삭제 중 오류가 발생했습니다: ' + (err.response ? err.response.data : '서버와의 연결이 끊어졌습니다.'));
            }
        }
    }

    // 게시물 신고
    async function boardReport(boardNo) {
        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/boardReport/${boardNo}`, null, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (response.status === 200) {
                alert('해당 게시글을 신고하셨습니다.');
            } else {
                alert('게시글 신고 실패: ' + response.data);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('오류 발생: ' + err.message);
        }
    }

    //댓글 신고
    async function boardCommentReport(cno, boardNo) {
        try {
            const response = await axios.post(`https://teeput.synology.me:30112/ms1/boardCommentReport/${cno}/${boardNo}`, null, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (response.status === 200) {
                alert('해당 댓글을 신고하셨습니다.');
            } else {
                alert('댓글 신고 실패: ' + response.data);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('이미 신고한 댓글입니다');
        }
    }
    //유저 프로필 조회

    


    if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다!</div>;


    return (
        <div className={styles.bigContainer}>
            <div className={styles.jump} />
            {board ? (
                <div className={styles.container}>
                    <h6>{board.boardCategory}</h6>
                    <h2>{board.boardTitle}</h2>
                    <div className={styles.profile_bar}>
                        <div className={styles.profile}>
                            <img src={board.profileUrl || '/img/default-profile.png'} alt="Profile" className={styles.profileImage} />
                        </div>
                        <div className={styles.userInfo}>
                            <div className={styles.userName}>
                                <p>{board.id}</p>
                            </div>
                            <div className={styles.boardInfo}>
                                <li>{board.boardWrite}</li>
                                <img src='/img/eye.png' />
                                <span>{board.boardCount}</span>
                            </div>
                        </div>
                        {board.id === userId && (
                            <div className={styles.boardUpdate}>
                                <button
                                    className={styles.edit}
                                    onClick={() => navigate(`/boardedit/${board.boardNo}`, { state: { boardData: board } })}>
                                    수정
                                </button>
                                <button className={styles.delete} onClick={deleteBoard}>삭제</button>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(board.boardContent || '') }}></div>

                        <div className={styles.filesSection}>
                            {files && files.length > 0 ? (
                                files.map(file => {
                                    return (
                                        <div key={file.fno} className={styles.fileItem}>
                                            {file.type === 'image' ? (
                                                <img src={file.path} alt="Image" className={styles.fileImage} />
                                            ) : file.type === 'video' ? (
                                                <video controls className={styles.fileVideo}>
                                                    <source src={file.path} type={`video/${file.path.split('.').pop()}`} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : file.type === 'normal' ? (
                                                <a href={file.path} download>Download File</a>
                                            ) : (
                                                <p>지원하지 않는 파일 형식입니다.</p>
                                            )}
                                            <p className={styles.fileName}>{file.fileName || 'Unknown File Name'}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </div>

                    </div>
                    <div className={styles.boardLike}>
                        <button onClick={buttonLike} className={`${styles.boardLike} ${liked ? styles.heartActive : styles.heartNone}`}><span>{likeCount}</span></button>
                        <button onClick={() => { boardReport(boardNo) }}>신고</button>
                    </div>
                    <hr />
                    <div className={styles.commentArea}>
                        <h5>댓글</h5>
                        <div className={styles.comment_wrap}>
                            <div className={styles.commentProfile}>
                                <img src={userProfile || '/img/default-profile.png'} alt="Profile" className={styles.profileImage} />
                            </div>
                            <div className={styles.commentInsert}>
                                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                                <button type='button' onClick={submitComment}>등록</button>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.commentList}>
                            {comments && comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment.cno} className={styles.comment}>
                                        <div className={styles.commentUser}>
                                            <img src={comment.profileUrl || '/img/default-profile.png'} alt="Profile" className={styles.profileImage} />

                                            <span>{comment.id}</span>
                                        </div>
                                        <span>{comment.comment}</span> <br />
                                        <span>{comment.cdate}</span>
                                        {comment.id === userId && (
                                            <button className={styles.commentDeleteBtn} onClick={() => deleteComment(comment.cno)}>삭제</button>
                                        )}
                                        <div className={styles.boardCommentButton}>
                                            <button
                                                onClick={() => buttonCommentLike(comment.cno)}
                                                className={`${styles.boardCommentButton} ${commentLiked[comment.cno] ? styles.heartActive : styles.heartNone}`}
                                            >
                                                <span>{commentLikeCounts[comment.cno]}</span>
                                            </button>
                                            <button
                                                onClick={() => buttonCommentHate(comment.cno)}
                                                className={`${styles.boardCommentButton} ${commentHated[comment.cno] ? styles.poopActive : styles.poopNone}`}
                                            >
                                                <span>{commentHateCounts[comment.cno]}</span>
                                            </button>
                                            <button onClick={() => { boardCommentReport(boardNo, comment.cno) }}>신고</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>댓글이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div><p className={styles.loading}>게시글 로딩중...</p></div>
            )}
            <div className={styles.jump} />
            <FooterImg />
            <Footer />
        </div>
    );
}