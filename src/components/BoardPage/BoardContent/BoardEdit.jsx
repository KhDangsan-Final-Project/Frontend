import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';


import {
    ClassicEditor,
    AccessibilityHelp,
    Alignment,
    AutoImage,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    ImageBlock,
    ImageInsert,
    ImageInsertViaUrl,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    RemoveFormat,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
    Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './css/Ckeditor.css'
import styles from './css/BoardWrite.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterImg from '../../Menu/Footer/FooterImg';
import Footer from '../../Menu/Footer/Footer';

// CustomUploadAdapter 정의
class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                fetch('https://teeput.synology.me:30112/ms1/board/upload', {
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
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
    }, []);

    useEffect(() => {
        axios.get(`https://teeput.synology.me:30112/ms1/board/${boardNo}`)
            .then(response => {
                const { boardTitle, boardContent, boardCategory } = response.data;
                setTitle(boardTitle || '123');
                setContent(boardContent || '123');
                setCategory(boardCategory || '자유게시판');
            })
            .catch(error => {
                console.error('Error fetching board data', error);
            });
    }, [boardNo]);

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'selectAll',
                '|',
                'heading',
                'style',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'subscript',
                'superscript',
                'code',
                'removeFormat',
                '|',
                'specialCharacters',
                'horizontalLine',
                'link',
                'insertImage',
                'insertTable',
                'highlight',
                'blockQuote',
                'codeBlock',
                '|',
                'alignment',
                '|',
                'indent',
                'outdent',
                '|',
                'accessibilityHelp'
            ],
            shouldNotGroupWhenFull: true
        },
        plugins: [
            AccessibilityHelp,
            Alignment,
            AutoImage,
            AutoLink,
            Autosave,
            Base64UploadAdapter,
            BlockQuote,
            Bold,
            Code,
            CodeBlock,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            GeneralHtmlSupport,
            Heading,
            Highlight,
            HorizontalLine,
            ImageBlock,
            ImageInsert,
            ImageInsertViaUrl,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            RemoveFormat,
            SelectAll,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Style,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            Underline,
            Undo
        ],
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }
            ]
        },
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignRight'],
            upload: {
                types: ['jpeg', 'png', 'gif', 'bmp', 'webp'],
                adapter: CustomUploadAdapter // 커스텀 업로드 어댑터를 사용하여 단축된 URL 제공
            }
        },
        initialData:
            {},
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        placeholder: '게시물을 작성해주세요',
        style: {
            definitions: [
                {
                    name: 'Article category',
                    element: 'h3',
                    classes: ['category']
                },
                {
                    name: 'Title',
                    element: 'h2',
                    classes: ['document-title']
                },
                {
                    name: 'Subtitle',
                    element: 'h3',
                    classes: ['document-subtitle']
                },
                {
                    name: 'Info box',
                    element: 'p',
                    classes: ['info-box']
                },
                {
                    name: 'Side quote',
                    element: 'blockquote',
                    classes: ['side-quote']
                },
                {
                    name: 'Marker',
                    element: 'span',
                    classes: ['marker']
                },
                {
                    name: 'Spoiler',
                    element: 'span',
                    classes: ['spoiler']
                },
                {
                    name: 'Code (dark)',
                    element: 'pre',
                    classes: ['fancy-code', 'fancy-code-dark']
                },
                {
                    name: 'Code (bright)',
                    element: 'pre',
                    classes: ['fancy-code', 'fancy-code-bright']
                }
            ]
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };
    const [category, setCategory] = useState("자유게시판");
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        setIsSubmitDisabled(!title || !content);
    }, [title, content]);

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



    const token = localStorage.getItem('token');

    async function handleSubmitContent(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('boardNo', boardNo);

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        try {
            await fetch(`https://teeput.synology.me:30112/ms1/board/update/${boardNo}`, {
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
    }
    useEffect(() => {
        fetchFiles();
    }, [boardNo]);

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

    function cancel() {
        navigate(-1); // 이전 페이지로 이동
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    async function handleFileDelete(fno) {
        try {
            await axios.delete(`https://teeput.synology.me:30112/ms1/deleteFile/${fno}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 파일 삭제 후 상태 업데이트
            setFiles(prevFiles => prevFiles.filter(file => file.fno !== fno));
        } catch (error) {
            console.error('파일 삭제 중 오류 발생:', error);
        }
    }

    return (
        <div className={styles.bigContainer}>
            <div className={styles.jump} />
            <div className={styles.main_container}>
                <form onSubmit={handleSubmitContent}>
                    <div className={styles.header}>
                        <h5>게시물 수정</h5>
                        <span className={styles.category}>
                            <select name="category" value={category} onChange={handleCategoryChange}>
                                <option value="자유게시판">자유게시판</option>
                                <option value="공지사항">공지사항</option>
                                <option value="이벤트">이벤트</option>
                            </select>
                        </span>
                    </div>
                    <input
                        type='text'
                        className={styles.title}
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='제목을 입력해주세요'
                    ></input>
                    <div className={`${styles.editor_container} editor-container_classic-editor editor-container_include-style`} ref={editorContainerRef}>
                        <div className={styles.editor_container__editor}>
                            <div ref={editorRef} value={content} onChange={handleContentChange}>
                                {isLayoutReady &&
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={content}
                                        config={editorConfig}
                                        onChange={handleContentChange} />
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {files.length > 0 && (
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index} className={styles.fileName}>
                                            {file.fileName || 'Unknown File Name'}
                                            <button
                                                onClick={() => handleFileDelete(file.fno)} // fno로 수정
                                                className={styles.deleteButton}
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div>
                        <button type="submit" id="submit" disabled={isSubmitDisabled}
                            className={`${styles.button} ${isSubmitDisabled ? styles['button-disabled'] : ''}`}>글쓰기</button>
                        <button type="reset" className={styles.button} onClick={cancel}>취소</button>
                    </div>
                </form>
            </div>
            <div className={styles.jump} />
            <FooterImg />
            <Footer />
        </div>
    );
}