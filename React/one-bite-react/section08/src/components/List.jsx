import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [value, setValue] = useState("");

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const getFilteredData = () => {
    if (value === "") {
      return todos;
    }
    return todos.filter((todo) => {
      return todo.content.toLowerCase().includes(value.toLowerCase()); //반환의 차이다.
    });

    // return todos.filter((todo) => todo.content.includes(value);); 이렇게 쓰는게 더 좋다.
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <div>Todo List🌿</div>
      <input
        value={value}
        onChange={onChangeValue}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
