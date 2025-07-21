import './App.css'
import Header from "./component/Header.jsx";
import TodoEditor from "./component/TodoEditor.jsx";
import TodoList from "./component/TodoList.jsx";
import {useEffect, useReducer, useRef, useState} from "react";
import TestComp from "./component/TestComp.jsx";

// const mockTodo = [
//     {
//         id: 1,
//         isDone: false,
//         content: "React 공부하기",
//         createdDate: new Date().getTime(),
//     },
//     {
//         id: 2,
//         isDone: false,
//         content: "빨래 널기",
//         createdDate: new Date().getTime(),
//     },
//     {
//         id: 3,
//         isDone: false,
//         content: "노래 연습하기",
//         createdDate: new Date().getTime(),
//     }
// ]
function reducer(state, action) {
    //상태 변환 코드
    switch (action.type) {
        case "CREATE":
            return [action.newItem, ...state];
        case "UPDATE":
            return state.map((it) => {
                return it.id === action.targetId
                    ? {...it, isDone: !it.isDone}
                    : it;
            })
        case "DELETE":
            return state.filter((it) => it.id !== action.targetId)
        default:
            return state;
    }
}

function App() {
    // const [todos, setTodos] = useState(
    //     localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    // );

    const [todos, dispatch] = useReducer(reducer, localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : []);

    const idRef = useRef(todos.length > 0 ? todos[0].id + 1 : 0);

    const onCreate = (content) => {
        dispatch({
            type: "CREATE",
            newItem: {
                id: idRef.current,
                content,
                isDone: false,
                createdDate: new Date().getTime(),
            }
        })
        idRef.current += 1;
    }

    const onUpdate = (targetId) => {
        dispatch({
            type: "UPDATE",
            targetId
        })
    }

    const onDelete = (targetId) => {
        dispatch({
            type: "DELETE",
            targetId
        })
    }


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="App">
            <Header/>
            <TodoEditor onCreate={onCreate}/>
            <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
        </div>
    )
}

export default App
