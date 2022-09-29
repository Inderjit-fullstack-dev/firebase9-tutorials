import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ data, handleDelete, setSelectedTodo, loading = false }) {
  return (
    <>
      <div className="text-center">
        {loading && <img src="loader.gif" alt="loading..." />}
      </div>

      <ul className="todo-list">
        {data &&
          data.map((todo, key) => (
            <TodoItem
              key={key}
              todo={todo}
              handleDelete={handleDelete}
              setSelectedTodo={setSelectedTodo}
            />
          ))}
      </ul>
    </>
  );
}

export default TodoList;
