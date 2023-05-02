import React, { useState } from "react";
import "./TodoApp.css";
import { Buttons } from "./Buttons/Buttons";
import { Input } from "./Input/Input";

export const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState({});

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="add-todo-container">
        <Input
          type={"text"}
          classNameText={"add-input"}
          placeholderText={"New Todo"}
          onChangeEvent={setInputValue}
        />

        <Buttons
          classNameText={"add-button"}
          onClickEvent={setTasks}
          buttonText={"ADD TODO"}
        />
      </div>
    </div>
  );
};
