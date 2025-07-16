import './App.css'
import Header from "./component/Header.jsx";
import TodoEditor from "./component/TodoEditor.jsx";
import TodoList from "./component/TodoList.jsx";
import {useRef, useState} from "react";

const mockTodo = [
    {
        id: 1,
        isDone: false,
        content: "React 공부하기",
        createdDate: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: "빨래 널기",
        createdDate: new Date().getTime(),
    },
    {
        id: 3,
        isDone: false,
        content: "노래 연습하기",
        createdDate: new Date().getTime(),
    }
]

function App() {
    const [todos, setTodos] = useState(mockTodo);

    const idRef = useRef(4);

    const onCreate = (content) => {
        const newTodo = {
            id: idRef.current,
            isDone: false,
            content,
            createdDate: new Date().getTime(),
        }
        setTodos([newTodo, ...todos]);
        idRef.current += 1;
    }

    const onUpdate = (targetId) => {
        setTodos(
            todos.map(item=> item.id === targetId ? {...item, isDone: !item.isDone} : item )
        );
    }

    const onDelete = (targetId) => {
        setTodos(
            todos.filter(item=> item.id !== targetId)
        );
    }
    return (
        <div className="App">
            <Header/>
            <TodoEditor onCreate={onCreate} />
            <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default App
