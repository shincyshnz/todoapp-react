import React from "react";
import "./Input.css";

export const Input = ({
  type,
  classNameText,
  placeholderText,
  onChangeEvent,
}) => {
  return (
    <div>
      <input
        type={type}
        className={classNameText}
        placeholder={placeholderText}
        onChange={onChangeEvent}
      />
    </div>
  );
};
