import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Friends.module.css';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("토큰이 없습니다.");
            setLoading(false);
            return;
        }
        const nickname = extractUserNicknameFromToken(token);
        setUserNickname(nickname);
        fetchFriends(token);
        fetchFriendRequests(token);
    }, []);

    const fetchFriends = async (token) => {
        try {
            const response = await axios.get('http://localhost:8090/ms3/friend', { params: { token } });
            setFriends(response.data);
        } catch (error) {
            console.error('친구 목록을 가져오는 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFriendRequests = async (token) => {
        try {
            const response = await axios.get('http://localhost:8090/ms3/friend/request', { params: { token } });
            setReceivedRequests(response.data);
        } catch (error) {
            console.error('친구 요청을 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8090/ms3/friend/search', {
                params: { query: searchQuery, token, userNickname },
            });
            const filteredResults = response.data.filter(result => {
                return result.nickname !== userNickname && // 자신을 제외
                       !friends.some(friend => friend.friendNickname === result.nickname || friend.userNickname === result.nickname) && // 이미 친구 상태를 제외
                       !pendingRequests.some(request => request.friendNickname === result.nickname) && // 이미 요청 보낸 친구 제외
                       !receivedRequests.some(request => request.userNickname === result.nickname); // 받은 요청 제외
            });
            setSearchResults(filteredResults);
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
        }
    };

    const handleAddFriend = async (friendNickname) => {
        const token = localStorage.getItem('token');
        if (pendingRequests.some(request => request.friendNickname === friendNickname) || 
            receivedRequests.some(request => request.userNickname === userNickname && request.friendNickname === friendNickname)) {
            alert('이미 친구 요청을 보냈거나 받은 요청이 있습니다.');
            return;
        }
        if (friends.some(friend => 
            (friend.friendNickname === friendNickname && friend.userNickname === userNickname) || 
            (friend.friendNickname === userNickname && friend.userNickname === friendNickname))) {
            alert('이미 친구 상태입니다.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8090/ms3/friend/add', {
                userNickname,
                friendNickname,
                status: 'pending'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: { token }
            });
            if (response.data.status === 'success') {
                alert('친구 요청이 성공적으로 전송되었습니다');
                setPendingRequests([...pendingRequests, { userNickname, friendNickname }]);
            } else if (response.data.status === 'duplicate') {
                alert('이미 친구 요청을 보냈습니다');
            } else if (response.data.status === 'already_friends') {
                alert('이미 친구 상태입니다.');
            } else {
                alert('친구 요청 전송에 실패했습니다');
            }
        } catch (error) {
            console.error('친구 요청을 보내는 중 오류가 발생했습니다:', error);
        }
    };

    const handleAcceptRequest = async (friendNickname) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:8090/ms3/friend/accept', {
                userNickname: friendNickname,
                friendNickname: extractUserNicknameFromToken(token),
                status: 'accepted'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: { token }
            });
            if (response.data.status === 'success') {
                fetchFriends(token);
                fetchFriendRequests(token);
                alert('친구 요청이 성공적으로 수락되었습니다');
            } else {
                alert('친구 요청 수락에 실패했습니다');
            }
        } catch (error) {
            console.error('친구 요청을 수락하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleRejectRequest = async (friendNickname) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('http://localhost:8090/ms3/friend/reject', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userNickname: friendNickname,
                    friendNickname: extractUserNicknameFromToken(token),
                },
                params: { token }
            });
            if (response.data.status === 'success') {
                fetchFriendRequests(token);
                alert('친구 요청이 성공적으로 거절되었습니다');
            } else {
                alert('친구 요청 거절에 실패했습니다');
            }
        } catch (error) {
            console.error('친구 요청을 거절하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleDeleteFriend = async (friendNickname) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('http://localhost:8090/ms3/friend/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    friendNickname,
                    token
                },
                params: { token }
            });
            if (response.data.status === 'success') {
                fetchFriends(token);
                alert('친구가 성공적으로 삭제되었습니다');
            } else {
                alert('친구 삭제에 실패했습니다');
            }        
        } catch (error) {
            console.error('친구를 삭제하는 중 오류가 발생했습니다:', error);
        }
    };

    const extractUserNicknameFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            return decodedToken.nickname; // 닉네임 반환
        } catch (error) {
            console.error('토큰을 디코딩하는 중 오류가 발생했습니다:', error);
            return null;
        }
    };

    if (loading) {
        return <div className={styles.loading}>로딩 중...</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>내 친구</h2>
            <div className={styles.sectionsContainer}>
                <div className={styles.section}>
                    <h2 className={styles.heading}>친구 목록</h2>
                    <ul className={styles.list}>
                        {friends.map(friend => (
                            <li key={friend.friendNickname} className={styles.listItem}>
                                {friend.userNickname === userNickname ? friend.friendNickname : friend.userNickname}
                                <button onClick={() => handleDeleteFriend(friend.userNickname === userNickname ? friend.friendNickname : friend.userNickname)} className={styles.button}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.heading}>친구 검색</h2>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button onClick={handleSearch} className={styles.searchButton}>검색</button>
                    </div>
                    <ul className={styles.results}>
                        {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <li key={result.nickname} className={styles.resultItem}>
                                    <div className={styles.resultInfo}>
                                        {result.nickname}
                                    </div>
                                    <button onClick={() => handleAddFriend(result.nickname)} className={styles.button}>친구 추가</button>
                                </li>
                            ))
                        ) : (
                            <li>검색 결과가 없습니다</li>
                        )}
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.heading}>받은 친구 요청</h2>
                    <ul className={styles.list}>
                        {receivedRequests.map(request => (
                            <li key={request.userNickname} className={styles.listItem}>
                                {request.userNickname}
                                <button onClick={() => handleAcceptRequest(request.userNickname)} className={styles.button}>수락</button>
                                <button onClick={() => handleRejectRequest(request.userNickname)} className={styles.button}>거절</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Friends;
