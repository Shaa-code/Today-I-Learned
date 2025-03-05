import "./List.css";
import "./TodoItem.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  const todos = useContext(TodoStateContext); // {todos}에서 todos로 바꾸었다. value로 어떻게 넘겨주는지에 따라 달라지므로 조심하자.
  const [value, setValue] = useState("");

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const getFilteredData = () => {
    if (value === "") return todos;
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(value.toLowerCase())
    );
  };

  const FilteredData = getFilteredData();
  // setFilteredData(getFilteredData());

  // const { totalCount, checkCount, notCheckedCount } = useMemo(() => {
  //   console.log("getAnalyzedData 호출");
  //   console.log()
  //   const totalCount = todos.length;
  //   const checkCount = todos.filter((todo) => todo.isDone).length;
  //   const notCheckedCount = totalCount - checkCount;

  //   return { totalCount, checkCount, notCheckedCount };
  // }, []);

  const { totalCount, checkCount, notCheckedCount } = useMemo(() => {
    const totalCount = todos.length;
    const checkCount = todos.filter((todo) => todo.isDone).length;
    const notCheckedCount = totalCount - checkCount;

    console.log(totalCount, checkCount, notCheckedCount);

    return { totalCount, checkCount, notCheckedCount };
  }, [todos]);

  return (
    <div className="List">
      <div>Todo List🌿</div>

      <div>totalCount : {totalCount}</div>
      <div>checkCount : {checkCount}</div>
      <div>notCheckedCount : {notCheckedCount}</div>

      <input
        value={value}
        onChange={onChangeValue}
        placeholder="검색어를 입력하세요"
      />
      <div className="todo_wrapper">
        {FilteredData.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
