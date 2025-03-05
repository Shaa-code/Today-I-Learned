import { useReducer } from "react";

// reducer : 변환기
// 상태를 실제로 변환시키는 변환기 역할을 한다.
// [주어진상태].reduce([특정규칙]) => 변경된상태.
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  //dispatch는 상태 변화가 있어야 한다는 사실을 알리는 함수.

  const onClickPlus = () => {
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button>+</button>
    </div>
  );
};

export default Exam;
