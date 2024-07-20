import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/AIUpload.module.css';

export default function AIUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 추가

  const token = localStorage.getItem('token');
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    setLoading(true); // 로딩 시작

    try {
      const response = await axios.post('http://localhost:8090/ms1/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setSuccess(true);
        setResponseData(response.data);
      } else {
        setSuccess(false);
        setResponseData('이미지 업로드 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      setSuccess(false);
      setResponseData('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleResultClick = (name) => {
    navigate(`/library?search=${name}`); // 해당 이름으로 검색 페이지로 이동
  };
  
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmit} className={styles.fileUpload}>
          <label
            htmlFor="file"
            className={styles.fupload}
            style={{
              backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
              backgroundSize: 'cover',
              color: previewUrl ? 'transparent' : 'initial'
            }}
          >
            이미지를 업로드 하세요!
          </label>
          <input type="file" id="file" className={styles.upload} onChange={handleFileChange} />
          {!loading && <button type="submit" className={styles.subBtn}>AI 카드 찾기</button>}
        </form>
        {loading && <p className={styles.loadingMessage}>기다려주세요...</p>} {/* 로딩 상태 메시지 추가 */}
        {success && <h1 className={styles.successTitle}>AI 인식에 성공했습니다!</h1>}
        {responseData && (
          <div className={styles.result}>
            {responseData.detectedResult ? (
              responseData.detectedResult.map((result, index) => (
                <p key={index} onClick={() => handleResultClick(result)} className={styles.resultTxt}>{result}</p>
              ))
            ) : (
              <p>{responseData.msg}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
