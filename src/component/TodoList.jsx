import './TodoList.css'
import TodoItem from "./TodoItem.jsx";
import {useState} from "react";

const TodoList = ({todos, onUpdate, onDelete}) => {
    const [search,setSearch] = useState('');

    const getSearchResult = () => {
        return search === ""
            ? todos
            : todos.filter(item => item.content.includes(search))
    }
    console.log(todos)
    return(
        <div className="TodoList">
            <h4>Todo List ⌚️</h4>
            <input className="searchbar"
                   value={search}
                   onChange={(e)=>{setSearch(e.target.value)}}
                   placeholder="검색어를 입력하세요" />

            <div className="list_wrapper">
                {
                    getSearchResult().map(
                        it => <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
                    )
                }
            </div>
        </div>
    )
}

export default TodoList;