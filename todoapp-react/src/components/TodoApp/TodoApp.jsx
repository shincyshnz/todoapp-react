import React, { useEffect, useState } from "react";
import "./TodoApp.css";
import { Buttons } from "./Buttons/Buttons";
import { Input } from "./Input/Input";
import { TodoList } from "./TodoList/TodoList";

export const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState({});
  const [errorInputField, setErrorInputField] = useState({
    addInput: {
      error: false,
      errorMessage: "",
    },
    editInput: {
      error: false,
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

  // Handling onBlur Event for input box
  const onBlurEvent = (event) => {
    const { name, value } = event.target;
    let tempErrorObj = {
      error: false,
      errorMessage: "",
    };

    // Error handling for add todo

    if (value === "" || value.length <= 2) {
      tempErrorObj.error = true;
      tempErrorObj.errorMessage =
        "Please enter any todo with more than 3 characters";
    } else {
      tempErrorObj.error = false;
      tempErrorObj.errorMessage = "";
    }

    setErrorInputField(tempErrorObj);
  };

  // Handling onChange Event for input box
  const onChangeEvent = (event) => {
    setInputValue(event.target.value);
    onBlurEvent(event);
  };

  // Random ID generator for todos item
  const randomIDGenerator = () => {
    const min = 0;
    const max = 1000;
    let id = Math.floor(Math.random() * (max - min) + min);

    return `todo${id}`;
  };

  // Handling Button click Event for adding new todo
  const onClickEventAdd = (event) => {
    event.preventDefault();
    const tempTodos = [...todos];

    // Add data to local storage if edit input Value is valid
    if (Object.values(editInputValue).length > 0) {
      // store todos previous values into tempTodos and push new values to tempTodos
      let index = tempTodos.indexOf(editInputValue);
      tempTodos[index].description = inputValue;
      setInputValue("");
    }

    // Add data to local storage if input Value is valid
    if (!errorInputField.error && inputValue) {
      // store todos previous values into tempTodos and push new values to tempTodos
      tempTodos.push({
        id: randomIDGenerator(),
        description: inputValue,
        isCompleted: false,
      });
      setTodos(tempTodos);
    }

    return;
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

    const found = todos.find((todo) => {
      return todo.id === todoId;
    });

    setEditInputValue(found);
  };

  // Handling Button click Event for cancel Edit
  const onClickEventCancel = (event) => {
    event.preventDefault();

    setEditInputValue({});
  };

  // Handling Button click Event for cancel Edit
  const onClickEventSave = (event) => {
    event.preventDefault();

    setEditInputValue({});
  };

  return (
    <div className="todo-container">
      <div className="todo-inner-container">
        <h1>Todo List</h1>
        <div className="add-todo-container">
          <Input
            type={"text"}
            className={"add-input"}
            placeholderText={"New Todo"}
            onChangeEvent={onChangeEvent}
            onBlurEvent={onBlurEvent}
          />

          <Buttons
            classNameText={"add-button"}
            onClickEvent={onClickEventAdd}
            buttonText={"ADD TODO"}
            todoid={""}
          />
        </div>
        <div className="error-container">
          {setInputValue && errorInputField.error && (
            <label className="error-input">
              {errorInputField.errorMessage}
            </label>
          )}
        </div>
        {todos.length > 0 &&
          todos.map((todo, index) => {
            const { id } = todo;
            return (
              <div className="todo-list-container" key={index}>
                <div className="list-container">
                  <TodoList todo={todo} />
                </div>
                <div className="button-container">
                  <Buttons
                    classNameText={"edit-button"}
                    onClickEvent={onClickEventEdit}
                    buttonText={""}
                    todoid={id}
                  />
                  <Buttons
                    classNameText={"delete-button"}
                    onClickEvent={onClickEventDelete}
                    buttonText={""}
                    todoid={id}
                  />
                </div>
              </div>
            );
          })}
        {editInputValue.id && (
          <div className="add-todo-container">
            <Input
              type={"text"}
              className={"edit-input"}
              placeholderText={editInputValue.description}
              onChangeEvent={onChangeEvent}
              onBlurEvent={onBlurEvent}
            />

            <Buttons
              classNameText={"add-button"}
              onClickEvent={onClickEventAdd}
              buttonText={"SAVE"}
              todoid={editInputValue.id}
            />
            <Buttons
              classNameText={"cancel-button"}
              onClickEvent={onClickEventCancel}
              buttonText={"CANCEL"}
              todoid={editInputValue.id}
            />
          </div>
        )}
        <div className="error-container">
          {setEditInputValue && errorInputField.error && (
            <label className="error-input">
              {errorInputField.errorMessage}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
