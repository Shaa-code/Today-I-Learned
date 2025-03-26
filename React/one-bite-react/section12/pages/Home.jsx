import { useState, useContext } from "react";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import DiaryList from "../src/components/DiaryList";
import { DiaryStateContext } from "../src/App";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime(); //해당 년월의 1일에 0시 0분 0초
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime(); //이렇게 넣어주면, 3번째 파라미터 0은 없는 값으로 전날의 마지막 값을 반환해준다.
  return data.filter(
    (diary) => beginTime <= diary.createdDate && diary.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);

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

      <DiaryList data={monthlyData} />
    </>
  );
};

export default Home;
