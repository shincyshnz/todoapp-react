import React from "react";
import "./Input.css";

export const Input = ({ type, className, placeholderText, onChangeEvent }) => {
  return (
    <div className="input-container">
      <input
        type={type}
        className={className}
        placeholder={placeholderText}
        onChange={onChangeEvent}
      />
    </div>
  );
};
