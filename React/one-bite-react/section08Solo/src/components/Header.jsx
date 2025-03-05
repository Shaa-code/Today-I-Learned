import "./Header.css";
import { useState, memo } from "react";

const Header = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div>오늘은😊</div>
      <h1>{date.toLocaleString()}</h1>
    </>
  );
};

export default memo(Header);
