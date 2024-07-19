import { useState, useEffect, useRef } from 'react';
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

import styles from './css/BoardWrite.module.css'
import './css/Ckeditor.css'

export default function BoardWrite({ showBoard }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
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
    const [editorData, setEditorData] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = JSON.stringify({
            boardTitle: "제목",  // 제목 필드를 추가하세요
            content: editorData
        });
    
        fetch("http://localhost:8090/ms3/board/write", {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('로그인이 필요합니다.');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        }).then(result => {
            console.log(result);
            // 성공 시 처리 로직
        })
        .catch(error => {
            console.error('Error:', error);
            // 오류 시 처리 로직 (예: 로그인 페이지로 리디렉션)
            alert(error.message);
            if (error.message === '로그인이 필요합니다.') {
                window.location.href = "/login";
            }
        });
    }
    

    function cancel() {
        showBoard();
    }
    return (
        <div>
            <div className={styles.main_container}>
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.editor_container} editor-container_classic-editor editor-container_include-style`} ref={editorContainerRef}>
                        <div className={styles.editor_container__editor}>
                            <div ref={editorRef}>{isLayoutReady && ( <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    data={editorData}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditorData(data);
                                    }} />
                            )}</div>
                        </div>
                    </div>
                    <div className='asd'>
                        <button type="submit" id="submit" className={styles.button}>글쓰기</button>
                        <button type="reset" className={styles.button} onClick={cancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
