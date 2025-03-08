import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./Diaryitem";
import { useNavigate, useContext } from "react-router-dom";

const DiaryList = ({ monthlyData }) => {
  const nav = useNavigate();

  console.log(monthlyData + "DiaryList Check");
  return (
    <div className="diaryList">
      <div className="menu_bar">
        <select>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>

      <div className="list_wrapper">
        {monthlyData.map((diary) => (
          <DiaryItem key={diary.id} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
