import React, { useEffect, useRef, useState } from "react";
import "./TodoApp.css";
import { Buttons } from "./Buttons/Buttons";
import { Input } from "./Input/Input";
import { TodoList } from "./TodoList/TodoList";
import { v4 as uuid } from "uuid";

export const TodoApp = () => {
  const inputRef = useRef({});

  const [inputValue, setInputValue] = useState({
    addInput: "",
    editInput: "",
  });
  const [editInputObj, setEditInputObj] = useState({});
  const [toggleEdit, setToggleEdit] = useState(false);
  const [errorInputField, setErrorInputField] = useState({
    addInput: {
      errorMessage: "",
    },
    editInput: {
      errorMessage: "",
    },
  });
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("Todo List"));
    return storedTodos || [];
  });

  useEffect(() => {
    localStorage.setItem("Todo List", JSON.stringify(todos));
  }, [todos]);

  // Random ID generator for todos item
  const randomIDGenerator = () => {
    const unique_id = uuid();
    const id = unique_id.slice(0, 8);
    return id;
  };

  // Handling Button click Event for adding new todo
  const onClickEventAdd = (event) => {
    event.preventDefault();

    const tempTodos = [...todos];

    if (errorInputField.addInput.errorMessage) {
      return;
    }

    // Add data to local storage if input Value is valid
    // store todos previous values into tempTodos and push new values to tempTodos
    tempTodos.push({
      id: randomIDGenerator(),
      description: inputValue.addInput,
      isCompleted: false,
    });

    setTodos(tempTodos);
    setInputValue((prev) => ({
      ...prev,
      addInput: "",
    }));
  };

  // Handling Button click Event for Deleting existing todo
  const onClickEventDelete = (event, todoId = "") => {
    event.preventDefault();

    // Delete from LocalStorage

    const found = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(found);
  };

  // Handling Button click Event for Editing existing todo
  const onClickEventEdit = (event, todoId = "") => {
    event.preventDefault();
    setToggleEdit((prev) => (prev = !prev));
    const found = todos.find((todo) => {
      return todo.id === todoId;
    });

    setEditInputObj(found);
    setInputValue((prev) => ({
      ...prev,
      editInput: found.description,
    }));

    // const childElements = event.target.closest(
    //   ".todo-inner-container"
    // ).children;
    // const [editContainerElement] = Array.from(childElements).filter((child) => {
    //   return child.className === "edit-todo-container";
    // });
    // const [editInput] = editContainerElement.childNodes;
    // editInput.focus();

    const [editInputActive] = Object.values(inputRef.current).filter(
      (val) => val !== null
    );
    editInputActive.focus();
  };

  // Handling Button click Event for cancel Edit
  const onClickEventCancel = (event) => {
    event.preventDefault();

    setEditInputObj({});
  };

  // Handling Button click Event for cancel Edit
  const onClickEventSave = (event) => {
    event.preventDefault();
    const tempTodos = [...todos];

    if (errorInputField.editInput.errorMessage) return;

    // Add data to local storage if edit input Value is valid
    if (Object.values(editInputObj).length > 0) {
      // store todos previous values into tempTodos and push new values to tempTodos
      let index = tempTodos.indexOf(editInputObj);
      tempTodos[index].description = inputValue.editInput;
    }
    setTodos(tempTodos);
    setEditInputObj({});
    setToggleEdit((prev) => (prev = !prev));
  };

  const renderTodoList = (todo, index) => {
    return (
      <div className="todo-list-container" key={index}>
        <div className="list-container">
          <TodoList todo={todo} todos={todos} setTodos={setTodos} />
        </div>
        <div className="button-container">
          <Buttons
            classNameText={"edit-button"}
            onClickEvent={onClickEventEdit}
            buttonText={""}
            todoid={todo.id}
          />
          <Buttons
            classNameText={"delete-button"}
            onClickEvent={onClickEventDelete}
            buttonText={""}
            todoid={todo.id}
          />
        </div>
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="error-container">
        {errorInputField.editInput.errorMessage && (
          <label className="error-input">
            {errorInputField.editInput.errorMessage}
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="todo-container">
      <div className="todo-inner-container">
        <h1>Todo List</h1>
        <div className="add-todo-container">
          <Input
            type={"text"}
            className={"add-input"}
            name={"addInput"}
            placeholderText={"New Todo"}
            setInputValue={setInputValue}
            setErrorInputField={setErrorInputField}
            inputValue={inputValue.addInput}
          />
          <Buttons
            classNameText={"add-button"}
            onClickEvent={onClickEventAdd}
            buttonText={"ADD TODO"}
            todoid={""}
          />
        </div>
        {renderError()}
        {todos.length > 0 &&
          todos.map((todo, index) => {
            return renderTodoList(todo, index);
          })}
        {editInputObj.id && (
          <div className="edit-todo-container">
            <Input
              type={"text"}
              className={"edit-input"}
              name={"editInput"}
              placeholderText={editInputObj.description}
              setInputValue={setInputValue}
              setErrorInputField={setErrorInputField}
              inputValue={inputValue.editInput}
              inputRef={(element) =>
                (inputRef.current[editInputObj.id] = element)
              }
            />
            <Buttons
              classNameText={"add-button"}
              onClickEvent={onClickEventSave}
              buttonText={"SAVE"}
              todoid={editInputObj.id}
            />
            <Buttons
              classNameText={"cancel-button"}
              onClickEvent={onClickEventCancel}
              buttonText={"CANCEL"}
              todoid={editInputObj.id}
            />
          </div>
        )}

        {renderError()}
      </div>
    </div>
  );
};
