import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Exam from "./components/Exam";
import { useRef, useReducer } from "react";

const mockData = [
  {
    id: 1,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "빨래 널기",
    date: new Date().getTime(),
  },
  {
    id: 3,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.targetId);
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });

    // setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  // const onUpdate = (content) => {
  //   setTodos([
  //     todos.filter((todo) => {
  //       todo.content.includes(content);
  //     }),
  //   ]);
  // }; 왜 이렇게는 안되는거지?

  return (
    <div>
      {/* <Exam /> */}
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
