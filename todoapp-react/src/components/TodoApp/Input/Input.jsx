import React from "react";
import "./Input.css";

export const Input = ({
  type,
  className,
  placeholderText,
  onChangeEvent,
  onBlurEvent,
  name,
  inputValue,
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        className={className}
        name={name}
        value={inputValue}
        placeholder={placeholderText}
        onChange={onChangeEvent}
        onBlur={onBlurEvent}
      />
    </div>
  );
};
