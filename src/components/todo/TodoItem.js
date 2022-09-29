import React from "react";

function TodoItem({ todo, handleDelete, setSelectedTodo }) {
  return (
    <ol>
      <p>
        <a onClick={() => setSelectedTodo(todo)}>* {todo.title}</a>
      </p>
      <img
        src="/delete-icon.png"
        onClick={() => handleDelete(todo.id)}
        alt="delete"
        title="delete"
      />
    </ol>
  );
}

export default TodoItem;
