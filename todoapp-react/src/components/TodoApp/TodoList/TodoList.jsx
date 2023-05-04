import React, { useState } from "react";
import "./TodoList.css";

export const TodoList = ({ todo, todos, setTodos }) => {
  const { id, description, isCompleted } = todo;

  const toggleIsCompleted = () => {
    const tempTodos = [...todos];
    const todoIndex = todos.findIndex((t) => t.id === id);
    const tempTodo = { ...todos[todoIndex], isCompleted: !isCompleted };
    tempTodos[todoIndex] = tempTodo;
    setTodos(tempTodos);
  };

  const classNameText = `list-item ${isCompleted ? "list-completed" : ""}`;

  return (
    <p className={classNameText} key={id} onClick={toggleIsCompleted}>
      {description}
    </p>
  );
};
