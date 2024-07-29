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
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("토큰이 없습니다.");
            setLoading(false);
            return;
        }
        fetchUserId(token);
    }, []);

    useEffect(() => {
        if (userId) {
            const token = localStorage.getItem('token');
            fetchFriends(token);
            fetchFriendRequests(token);
        }
    }, [userId]);

    const fetchUserId = async (token) => {
        try {
            const response = await axios.get('https://teeput.synology.me:30112/ms3/mypage', { params: { token } });
            setUserId(response.data.id);
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
            setLoading(false);
        }
    };

    const fetchFriends = async (token) => {
        try {
            const response = await axios.get('https://teeput.synology.me:30112/ms3/friend', { params: { token } });
            const fetchedFriends = response.data
                .filter(friend => friend.status === 'accepted') 
                .map(friend => (friend.userId === userId ? friend.friendId : friend.userId));
            const uniqueFriends = Array.from(new Set(fetchedFriends));
            setFriends(uniqueFriends);
        } finally {
            setLoading(false);
        }
    };

    const fetchFriendRequests = async (token) => {
        try {
            const response = await axios.get('https://teeput.synology.me:30112/ms3/friend/request', { params: { token } });
            setReceivedRequests(response.data);
        } catch (error) {
            console.error('친구 요청을 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://teeput.synology.me:30112/ms3/friend/search', {
                params: { query: searchQuery, token: token }, });
            console.log('검색 결과:', response.data); // 응답 데이터 구조 확인
            const filteredResults = response.data.filter(result => {
                return result.id !== userId && // 자신을 제외
                       !friends.some(friend => friend === result.id) && // 이미 친구 상태를 제외
                       !pendingRequests.some(request => request.friendId === result.id) && // 이미 요청 보낸 친구 제외
                       !receivedRequests.some(request => request.userId === result.id); // 받은 요청 제외
            });
            setSearchResults(filteredResults);
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
        }
    };

    const handleAddFriend = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://teeput.synology.me:30112/ms3/friend/add', { userId, friendId, status: 'pending' }, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                params: { token }
            });
            if (response.data.status === 'success') {
                alert('친구 요청이 성공적으로 전송되었습니다');
                setPendingRequests([...pendingRequests, { userId, friendId }]);
                setSearchResults(searchResults.filter(result => result.id !== friendId));
            } else {
                alert('이미 친구이거나 친구 요청을 보냈습니다.');
            }
        } catch (error) {
            console.error('친구 추가 중 오류가 발생했습니다:', error);
        }
    };

    const handleAcceptRequest = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('https://teeput.synology.me:30112/ms3/friend/accept', { userId: friendId, status: 'accepted' }, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                params: { token }
            });
            if (response.data.status === 'success') {
                const newToken = localStorage.getItem('token');
                fetchFriends(newToken);
                fetchFriendRequests(newToken);
                alert('친구 요청이 성공적으로 수락되었습니다');
            } else {
                alert('친구 요청 수락에 실패했습니다');
            }
        } catch (error) {
            console.error('친구 요청을 수락하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleRejectRequest = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('https://teeput.synology.me:30112/ms3/friend/reject', {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                data: { userId: friendId },
                params: { token }
            });
            if (response.data.status === 'success') {
                const newToken = localStorage.getItem('token');
                fetchFriendRequests(newToken);
                alert('친구 요청이 성공적으로 거절되었습니다');
            } else {
                alert('친구 요청 거절에 실패했습니다');
            }
        } catch (error) {
            console.error('친구 요청을 거절하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleDeleteFriend = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('https://teeput.synology.me:30112/ms3/friend/delete', {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                data: { userId: userId, friendId: friendId }, // 정확한 userId와 friendId 전달
                params: { token }
            });
            if (response.data.status === 'success') {
                const newToken = localStorage.getItem('token');
                fetchFriends(newToken);
                alert('친구가 성공적으로 삭제되었습니다');
            } else {
                alert('친구 삭제에 실패했습니다');
            }
        } catch (error) {
            console.error('친구를 삭제하는 중 오류가 발생했습니다:', error);
        }
    };

    if (loading) { return <div className={styles.loading}>로딩 중...</div>; }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>내 친구</h2>
            <div className={styles.sectionsContainer}>
                <div className={styles.section}>
                    <h2 className={styles.heading}>친구 목록</h2>
                    <ul className={styles.list}>
                        {friends.map(friendId => (
                            <li key={friendId} className={styles.listItem}>
                                {friendId}
                                <button onClick={() => handleDeleteFriend(friendId)} className={styles.button}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.heading}>친구 검색</h2>
                    <div className={styles.searchContainer}>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />
                        <button onClick={handleSearch} className={styles.button}>검색</button>
                    </div>
                    <ul className={styles.results}>
                        {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <li key={result.id} className={styles.resultItem}>
                                    <div className={styles.resultInfo}>
                                        {result.id} ({result.nickname})
                                    </div>
                                    <button onClick={() => handleAddFriend(result.id)} className={styles.button}>친구 추가</button>
                                </li>
                            ))
                        ) : ( <li>검색 결과가 없습니다</li> )}
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.heading}>받은 친구 요청</h2>
                    <ul className={styles.list}>
                        {receivedRequests.map(request => (
                            <li key={request.userId} className={styles.listItem}>
                                {request.userId}
                                <div className={styles.request_btn}>
                                  <button onClick={() => handleAcceptRequest(request.userId)} className={styles.button}>수락</button>
                                  <button onClick={() => handleRejectRequest(request.userId)} className={styles.button}>거절</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Friends;
