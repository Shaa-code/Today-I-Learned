import "./Button.css";

const Button = ({ text, type, onClick }) => {
  switch (type) {
    case "DEFAULT":
      return <></>;
    case "POSITIVE":

    case "NEGATIVE":
  }

  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
};

export default Button;
