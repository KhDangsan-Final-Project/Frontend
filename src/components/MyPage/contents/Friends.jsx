import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]); // 로컬 상태로 관리하는 pending 요청
    const [receivedRequests, setReceivedRequests] = useState([]); // 받은 요청을 로컬 상태로 관리
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("토큰이 없습니다.");
            setLoading(false);
            return;
        }
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
            setRequests(response.data);
            setReceivedRequests(response.data); // 받은 요청을 상태로 설정
        } catch (error) {
            console.error('친구 요청을 가져오는 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8090/ms3/friend/search', {
                params: { query: searchQuery, token: token },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('친구를 검색하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleAddFriend = async (friendId) => {
      const token = localStorage.getItem('token');
      const userId = extractUserIdFromToken(token);
  
      // 중복 요청 방지
      if (pendingRequests.some(request => request.friendId === friendId) || 
          receivedRequests.some(request => request.userId === userId && request.friendId === friendId)) {
          alert('이미 친구 요청을 보냈거나 받은 요청이 있습니다.');
          return;
      }
  
      // 이미 친구 상태인지 확인
      if (friends.some(friend => 
          (friend.friendId === friendId && friend.userId === userId) || 
          (friend.friendId === userId && friend.userId === friendId))) {
          alert('이미 친구 상태입니다.');
          return;
      }
  
      try {
          const response = await axios.post('http://localhost:8090/ms3/friend/add', {
              userId,
              friendId,
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
              setPendingRequests([...pendingRequests, { userId, friendId }]);
          } else if (response.data.status === 'duplicate') {
              alert('이미 친구 요청을 보냈습니다');
          } else if (response.data.status === 'already_friends') {
              alert('이미 친구 상태입니다');
          } else {
              alert('친구 요청 전송에 실패했습니다');
          }
      } catch (error) {
          console.error('친구를 추가하는 중 오류가 발생했습니다:', error);
      }
  };
  
  
  
  

    const handleAcceptRequest = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:8090/ms3/friend/accept', {
                userId: friendId,
                friendId: extractUserIdFromToken(token),
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

    const handleRejectRequest = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('http://localhost:8090/ms3/friend/reject', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userId: friendId,
                    friendId: extractUserIdFromToken(token),
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

    const handleDeleteFriend = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('http://localhost:8090/ms3/friend/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    friendId,
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

    const extractUserIdFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            return decodedToken.sub; // JWT의 subject 부분에서 userId 추출
        } catch (error) {
            console.error('토큰을 디코딩하는 중 오류가 발생했습니다:', error);
            return null;
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <div>
                <h2>친구 목록</h2>
                <ul>
                    {friends.map(friend => (
                        <li key={friend.friendId}>
                            {friend.userId}
                            <button onClick={() => handleDeleteFriend(friend.friendId)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>받은 친구 요청</h2>
                <ul>
                    {receivedRequests.map(request => (
                        <li key={request.userId}>
                            {request.userId}
                            <button onClick={() => handleAcceptRequest(request.userId)}>수락</button>
                            <button onClick={() => handleRejectRequest(request.userId)}>거절</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>보낸 친구 요청</h2>
                <ul>
                    {pendingRequests.map(request => (
                        <li key={request.friendId}>
                            {request.friendId}
                            <span> (대기 중)</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>친구 검색</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
                <ul>
                    {searchResults.length > 0 ? (
                        searchResults.map(result => (
                            <li key={result.id}>
                                {result.id} ({result.nickname})
                                <button onClick={() => handleAddFriend(result.id)}>친구 추가</button>
                            </li>
                        ))
                    ) : (
                        <li>검색 결과가 없습니다</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Friends;
