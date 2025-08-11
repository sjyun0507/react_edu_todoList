import './App.css'
import Header from "./component/Header.jsx";
import TodoEditor from "./component/TodoEditor.jsx";
import TodoList from "./component/TodoList.jsx";
import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";

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

// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = React.createContext();

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

    const onUpdate = useCallback((targetId) => {
        //useCallback : 함수가 불필요하게 매번 새로 만들어지는 것을 방지하기 위해 사용
        dispatch({
            type: "UPDATE",
            targetId
        })
    }, [])

    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId
        })
    }, [])


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // return (
    //     <div className="App">
    //         <Header/>
    //         <TodoEditor onCreate={onCreate}/>
    //         <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    //     </div>
    // )

    return (
        <div className="App">
            <Header/>
            <TodoContext.Provider value={{todos, onCreate, onUpdate, onDelete}}>
                <TodoEditor/>
                <TodoList/>
            </TodoContext.Provider>
        </div>
    )
}

export default App
