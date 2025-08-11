import './TodoEditor.css'
import {useContext, useRef, useState} from "react";
import {TodoContext} from "../App.jsx";

const TodoEditor = () => {
    const {onCreate} = useContext(TodoContext) //구조할당분해

    const [content, setContent] = useState('');
    const inputRef = useRef();

    const onSubmit = () => {
        if(!content.trim()){ //빈 값 등록시 추가가 안되는 설정
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent('');
    }
    //
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }
    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기✏️</h4>
            <div className="editor_wrapper">
                <input value={content}
                       ref={inputRef}
                       onChange={(e) => {setContent(e.target.value)}}
                       onKeyDown={onKeyDown}
                       placeholder="새로운 Todo..."/>
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    )
}
export default TodoEditor;