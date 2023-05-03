import React from "react";
import "./TodoList.css";

export const TodoList = ({ todo }) => {
  let { id, description, isCompleted } = todo;

  return (
    <>
      <p className="list-item" key={id}>
        {description}
      </p>
    </>
  );
};
