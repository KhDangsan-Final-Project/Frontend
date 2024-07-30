import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/Ckeditor.css';
import styles from './css/BoardWrite.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterImg from '../../Menu/Footer/FooterImg';
import Footer from '../../Menu/Footer/Footer';

class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                fetch('http://localhost:8090/ms1/board/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result && result.url) {
                        resolve({ default: result.url });
                    } else {
                        reject('Upload failed');
                    }
                })
                .catch(err => reject(err));
            }));
    }
}

export default function BoardEdit() {
    const { boardNo } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("자유게시판");
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8090/ms1/board/${boardNo}`)
            .then(response => {
                const { boardTitle, boardContent, boardCategory } = response.data;
                setTitle(boardTitle || '제목 없음');
                setContent(boardContent || '');
                setCategory(boardCategory || '자유게시판');
            })
            .catch(error => {
                console.error('Error fetching board data', error);
            });
    }, [boardNo]);

    useEffect(() => {
        setIsSubmitDisabled(!title || !content);
    }, [title, content]);

    const editorConfig = {
        toolbar: [
            'undo', 'redo', '|', 'selectAll', '|', 'heading', 'style', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|',
            'specialCharacters', 'horizontalLine', 'link', 'insertImage', 'insertTable', 'highlight', 'blockQuote', 'codeBlock', '|',
            'alignment', '|', 'indent', 'outdent', '|', 'accessibilityHelp'
        ],
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignRight'],
            upload: {
                types: ['jpeg', 'png', 'gif', 'bmp', 'webp'],
                adapter: CustomUploadAdapter
            }
        },
        placeholder: '게시물을 작성해주세요',
    };

    const handleSubmitContent = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('boardNo', boardNo);

        for (let file of files) {
            formData.append('file', file);
        }

        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:8090/ms1/board/update/${boardNo}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            navigate(`/boardContent/${boardNo}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.bigContainer}>
            <div className={styles.jump} />
            <div className={styles.main_container}>
                <form onSubmit={handleSubmitContent}>
                    <div className={styles.header}>
                        <h5>게시물 수정</h5>
                        <span className={styles.category}>
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="자유게시판">자유게시판</option>
                                <option value="공지사항">공지사항</option>
                                <option value="이벤트">이벤트</option>
                            </select>
                        </span>
                    </div>
                    <input
                        type="text"
                        className={styles.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해주세요"
                    />
                    <div className={`${styles.editor_container} editor-container_classic-editor editor-container_include-style`}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            config={editorConfig}
                            onChange={(event, editor) => setContent(editor.getData())}
                        />
                    </div>
                    <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className={styles.file} />
                    <div>
                        <button type="submit" disabled={isSubmitDisabled} className={`${styles.button} ${isSubmitDisabled ? styles['button-disabled'] : ''}`}>
                            글쓰기
                        </button>
                        <button type="reset" className={styles.button} onClick={() => navigate(-1)}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.jump} />
            <FooterImg />
            <Footer />
        </div>
    );
}
