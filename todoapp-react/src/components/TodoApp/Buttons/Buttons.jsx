import React from "react";
import "./Buttons.css";

export const Buttons = ({
  classNameText,
  onClickEvent,
  buttonText,
  todoid,
}) => {
  return (
    <button
      className={classNameText}
      onClick={(event) => onClickEvent(event, todoid)}
      todoid={todoid}
    >
      {buttonText}
    </button>
  );
};
