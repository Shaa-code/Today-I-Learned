import "./App.css";

import { useRef, useReducer, createContext, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import New from "../pages/New";
import NotFound from "../pages/NotFound";
import Edit from "../pages/Edit";

// 1."/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-03-08").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-03-07").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-02-06").getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  },
  {
    id: 4,
    createdDate: new Date("2025-03-06").getTime(),
    emotionId: 4,
    content: "4번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "READ":
      return;
    case "EDIT":
      return state.map((diary) =>
        String(diary.id) === String(action.id) ? action.data : diary
      );
    case "DELETE":
      return state.filter((diary) => String(diary.id) !== String(action.id));
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate: createdDate,
        emotionId: emotionId,
        content: content,
      },
    });
  };

  const onEdit = (targetId, previousDate, content, emotionId) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        createdDate: previousDate,
        emotionId: emotionId,
        content: content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onEdit, onDelete };
  }, []);

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memoizedDispatch}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
