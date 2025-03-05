import useInput from "./hooks/useInput";

const HookExam = () => {
  const [input, onChange] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
      {input}
    </div>
  );
};

export default HookExam;
