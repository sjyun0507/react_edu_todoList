import {useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "INCREASE":
            return state + action.data
        case "DECREASE":
            return state - action.data
        case "INIT":
            return 0
        default:
            return state;
    }
}

function TestComp() {
    // const [count, setCount] = useState(0);
    //
    // const onIncrement = () => { //상태 변화 코드(카운트를 1증가함)
    //     setCount(count + 1);
    // }
    // const onDecrement = () => { //상태 변화 코드(카운트를 1감소함)
    //     setCount(count - 1);
    // }
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <strong>{count}</strong>
            </div>
            <div>
                <button onClick={() => dispatch({type: "INCREASE", data: 1})}>+</button>
                <button onClick={() => dispatch({type: "DECREASE", data: 1})}>-</button>
            </div>

        </div>
    )
}

export default TestComp;