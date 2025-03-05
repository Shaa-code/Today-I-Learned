import { useState, useRef } from "react";

import "./Editor.css";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content.trim() === "") {
      contentRef.current.focus();
      return;
    }
    setContent("");
    onCreate(content);
    //"왜 굳이 함수를 나눠서 쓰지? 생각했는데
    // content를 넘겨줘야하기 때문에 함수를 나눌 수 밖에 없다.
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

// const Editor = ({ list, setList, inputValue, setInputValue }) => {
//   return (
//     <div className="Editor">
//       <input
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="새로운 Todo..."
//       />
//       <button>추가</button>
//     </div>
//   );
// };

export default Editor;
