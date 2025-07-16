import './TodoItem.css'

const TodoItem = ({id,content,isDone,createdDate, onUpdate,onDelete}) => {
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
export default TodoItem;