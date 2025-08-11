import './TodoList.css'
import TodoItem from "./TodoItem.jsx";
import {useContext,useMemo, useState} from "react";
import {TodoContext} from "../App.jsx";

const TodoList = () => {
    const {todos} = useContext(TodoContext);

    const [search, setSearch] = useState('');

    const getSearchResult = () => {
        return search === ""
            ? todos
            : todos.filter(item => item.content.includes(search))
    }

    const analyzeTodos = useMemo(() => {
        //'useMemo':컴포넌트가 리렌더링될 때 값을 메모이제이션(캐싱)하여 불필요한 계산을 방지하기 위해 사용
        const totalCount = todos.length; //전체 개수
        const doneCount = todos.filter((it) => it.isDone).length; //완료 개수
        const notDoneCount = totalCount - doneCount; //미완료 개수
        return {totalCount, doneCount, notDoneCount};
    }, [todos]); //[의존성배열] todos가 변경될 때만 함수가 실행돼서 계산됨

    const {totalCount, doneCount, notDoneCount} = analyzeTodos;

    return (
        <div className="TodoList">
            <h4>Todo List ⌚️</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>남은 할 일: {notDoneCount}</div>
            </div>
            <input className="searchbar"
                   value={search}
                   onChange={(e) => {
                       setSearch(e.target.value)
                   }}
                   placeholder="검색어를 입력하세요"/>

            <div className="list_wrapper">
                {
                    getSearchResult().map(
                        it => <TodoItem key={it.id} {...it}/>
                    )
                }
            </div>
        </div>
    );
}
export default TodoList;