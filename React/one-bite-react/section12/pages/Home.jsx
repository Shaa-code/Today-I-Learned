import { useState, useContext } from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import DiaryList from "../src/components/DiaryList";
import { DiaryStateContext } from "../src/App";

const getMonthlyDate = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (diary) => beginTime <= diary.createdDate && diary.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  console.log(data);
  const [pivotDate, setPivotDate] = useState(new Date());
  console.log(pivotDate);

  const monthlyData = getMonthlyDate(pivotDate, data);
  console.log(monthlyData + "Home Check");

  const onDecreaseMonth = () => {
    pivotDate.setMonth(pivotDate.getMonth() - 1);
    setPivotDate(new Date(pivotDate));
  };

  const onIncreaseMonth = () => {
    pivotDate.setMonth(pivotDate.getMonth() + 1);
    setPivotDate(new Date(pivotDate));
  };

  return (
    <>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList monthlyData={monthlyData} />
    </>
  );
};

export default Home;
