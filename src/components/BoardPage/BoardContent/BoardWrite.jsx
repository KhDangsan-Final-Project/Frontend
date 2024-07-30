import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
import './css/Ckeditor.css';
import styles from './css/BoardWrite.module.css';
import { useParams } from 'react-router-dom';

export default function BoardWrite({ showBoard }) {
    const { boardNo } = useParams();
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
    }, []);

    const editorConfig = {
        toolbar: [
            'undo', 'redo', '|', 'heading', 'bold', 'italic', 'link', '|',
            'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
            'imageUpload', 'removeFormat'
        ],
    };

    const [category, setCategory] = useState('자유게시판');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [myEditor, setMyEditor] = useState();

    useEffect(() => {
        setIsSubmitDisabled(!title || !content);
    }, [title, content]);

    function cancel() {
        showBoard();
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    function handleFileChange(e) {
        setFiles(e.target.files);
    }

   
    const writeClick = () => {
    }

    const token = localStorage.getItem('token');
    async function handleSubmitContent(e) {
        e.preventDefault();
        

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch("https://teeput.synology.me:30112/ms1/board/insert", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            showBoard();
            const result = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.main_container}>
            <form onSubmit={handleSubmitContent}>
                <div className={styles.header}>
                    <h5>글쓰기</h5>
                    <span className={styles.category}>
                        <select name="category" value={category} onChange={handleCategoryChange}>
                            <option value="자유게시판">자유게시판</option>
                            <option value="공지사항">공지사항</option>
                            <option value="이벤트">이벤트</option>
                        </select>
                    </span>
                </div>
                <input type='text' className={styles.title} value={title} onChange={handleTitleChange} placeholder='제목을 입력해주세요' />
                <div className={`${styles.editor_container} editor-container_classic-editor editor-container_include-style`} ref={editorContainerRef}>
                    <div className={styles.editor_container__editor}>
                        <div ref={editorRef} value={content} onChange={handleContentChange}>
                            {isLayoutReady &&
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={content}
                                    config={editorConfig}
                                    onChange={handleContentChange} 
                                    onReady={(editor) =>{
                                        setMyEditor(editor)
                                }}/>
                            }
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div>
                    <button type="submit" id="submit" disabled={isSubmitDisabled}
                        className={`${styles.button} ${isSubmitDisabled ? styles['button-disabled'] : ''}`}>글쓰기</button>
                    <button type="reset" className={styles.button} onClick={cancel}>취소</button>
                </div>
            </form>
        </div>
    );
}
