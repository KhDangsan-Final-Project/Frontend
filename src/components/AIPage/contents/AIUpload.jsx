import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/AIUpload.module.css';

export default function AIUpload({ token }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [success, setSuccess] = useState(false);

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

    try {
      const response = await axios.post('http://localhost:8090/ms1/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // JWT 토큰을 헤더에 추가
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
    }
  };
  
  console.log(token);
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
          <button type="submit" className={styles.subBtn}>AI 카드 찾기</button>
        </form>
        {success && <h1>AI 인식에 성공했습니다!</h1>}
        {responseData && (
          <div className={styles.result}>
            {responseData.detectedResult ? (
              responseData.detectedResult.map((result, index) => (
                <p key={index}>{result}</p>
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
