import { useState, useRef } from "react";

const Register = () => {
  const refObj = useRef(0);
  const inputRef = useRef();
  console.log("레지스터 렌더링");

  let count = 0;

  const [input, setInput] = useState({
    name: "이름",
    birth: "",
    country: "",
    bio: "",
  });

  const onChange = (e) => {
    count++;
    console.log(count);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (input.name === "") {
      inputRef.current.focus();
      //이름을 입력하는 DOM요소 포커스
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            refObj.current++;
            console.log(refObj.current);
          }}
        >
          ref+1
        </button>
      </div>

      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />
        {input.name}
      </div>

      <div>
        <input
          name="birth"
          value={input.birth}
          onChange={onChange}
          type="date"
        />
        {input.birth}
      </div>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="jp">일본</option>
        </select>
        {input.country}
      </div>

      <div>
        <textarea name="bio" value={input.bio} onChange={onChange} />{" "}
        {input.bio}
      </div>

      <button onClick={onSubmit}>submit</button>
    </>
  );
};

export default Register;
