import './TodoItem.css'
import React, {useContext} from "react";
import {TodoContext} from "../App.jsx";

const TodoItem = ({id, content, isDone, createdDate}) => {
    const {onUpdate, onDelete} = useContext(TodoContext);
    console.log(`${id} TodoItem 업데이트`);
    const onRemove = () => {
        onDelete(id);
    }
    const onChange = () => {
        onUpdate(id);
    }
    return (
        <div className={`TodoItem`}>
            <div className="checkbox_col">
                <input checked={isDone}
                       onChange={onChange}
                       type="checkbox"/>
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onRemove}>삭제</button>
            </div>
        </div>
    )
}
export default React.memo(TodoItem);