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
import { useParams } from 'react-router-dom';

export default function BoardWrite({ showBoard }) {
    const {boardNo} = useParams;
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
    }, []);
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
            toolbar: ['imageTextAlternative']
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
    const [myEditor, setMyEditor] = useState();
    const [grantNo, setGrantNo] = useState(null);

    useEffect(() => {
        async function fetchGrantNo() {
            try {
                const response = await fetch("https://teeput.synology.me:30112/ms1/currentUser", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                setGrantNo(data.grantNo);
            } catch (error) {
                console.error('Error fetching grantNo:', error);
            }
        }
        fetchGrantNo();
    }, []);

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
        try {
            const response = await fetch("https://teeput.synology.me:30112/ms1/board/insert", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
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
                    <select name="category" value={category} onChange={handleCategoryChange} disabled={grantNo !== 0}>
                            {grantNo === 0 ? (
                                <>
                                    <option value="자유게시판">자유게시판</option>
                                    <option value="공지사항">공지사항</option>
                                    <option value="이벤트">이벤트</option>
                                </>
                            ) : (
                                <option value="자유게시판">자유게시판</option>
                            )}
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
                    <button type="submit" id="submit" onClick={writeClick} disabled={isSubmitDisabled}
                        className={`${styles.button} ${isSubmitDisabled ? styles['button-disabled'] : ''}`}>글쓰기</button>
                    <button type="reset" className={styles.button} onClick={cancel}>취소</button>
                </div>
            </form>
        </div>
    );
}