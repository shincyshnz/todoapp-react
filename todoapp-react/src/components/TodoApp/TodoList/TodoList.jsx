import React, { useState } from "react";
import "./TodoList.css";

export const TodoList = ({ todo, todos, setTodos }) => {
  const { id, description, isCompleted } = todo;
  const tempTodo = [...todos];

  const [classNameText, setClassNameText] = useState(() => {
    let text = "list-item";
    text += isCompleted && " list-completed";
    return text;
  });

  const toggleIsCompleted = () => {
    tempTodo.map((todo) => {
      //Toggle isCompleted
      if (id === todo.id) todo.isCompleted = !todo.isCompleted;

      return;
    });

    // Change className to add strike-through text decoration
    if (todo.isCompleted) {
      setClassNameText((prev) => (prev += " list-completed"));
    } else {
      setClassNameText((prev) => (prev += "list-item"));
    }

    // update local storage
    setTodos(tempTodo);
  };

  return (
    <>
      <p className={classNameText} key={id} onClick={toggleIsCompleted}>
        {description}
      </p>
    </>
  );
};
