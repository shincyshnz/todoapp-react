import React from "react";
import "./Input.css";

export const Input = ({
  type,
  className,
  placeholderText,
  name,
  inputValue,
  setInputValue,
  setErrorInputField,
  // inputRef,
}) => {
  // Handling onBlur Event for input box
  const onBlurEvent = (event) => {
    const { name, value } = event.target;

    let tempErrorObj = {
      errorMessage:
        value === "" || value.length <= 2
          ? "Please enter any todo with more than 3 characters"
          : "",
    };

    setErrorInputField((prev) => ({
      ...prev,
      [name]: tempErrorObj,
    }));
  };

  // Handling onChange Event for input box
  const onChangeEvent = (event) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    onBlurEvent(event);
  };

  return (
    <input
      type={type}
      className={className}
      name={name}
      value={inputValue}
      placeholder={placeholderText}
      onChange={onChangeEvent}
      onBlur={onBlurEvent}
      // ref={inputRef}
    />
  );
};
