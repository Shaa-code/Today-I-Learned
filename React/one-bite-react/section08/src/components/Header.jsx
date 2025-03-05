import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [today, setToday] = useState(new Date());
  return (
    <>
      <div>오늘은 😊</div>
      <h3>{today.toDateString()}</h3>
    </>
  );
};

export default Header;
