import "./App.css";

import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import New from "../pages/New";
import NotFound from "../pages/NotFound";

// 1."/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary/:id" element={<Diary />} />
        선언하기
        <Route path="/new" element={<New />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
