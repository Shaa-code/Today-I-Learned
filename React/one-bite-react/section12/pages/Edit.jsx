import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Editor from "../src/components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../src/App";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { onCreate, onDelete } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();
  const params = useParams();
  const selectedData = data.filter((diary) => diary.id === params.id);

  const getCurrentDiaryItem = () => {
    const currentDiaryItem = data.find(
      (data) => String(data.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기 입니다.");
      nav("/", { replace: true });
    }

    return currentDiaryItem;
  };

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <>
      <Header
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
        title={"일기 수정하기"}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor onSubmit={onSubmit} selectedData={selectedData} />
    </>
  );
};

export default Edit;
