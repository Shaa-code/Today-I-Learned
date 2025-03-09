import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Editor from "../src/components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../src/App";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
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
        title={"새 일기 쓰기"}
      />
      <Editor onSubmit={onSubmit} />
    </>
  );
};

export default New;
