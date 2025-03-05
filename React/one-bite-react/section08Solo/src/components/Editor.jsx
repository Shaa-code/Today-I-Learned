import "./Editor.css";

import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentFocus = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      contentFocus.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <>
      <div className="Editor">
        <input
          value={content}
          ref={contentFocus}
          onKeyDown={onKeyDown}
          onChange={onChangeContent}
          placeholder="새로운 Todo..."
        ></input>
        <button onClick={onSubmit}>추가</button>
      </div>
    </>
  );
};

export default Editor;
