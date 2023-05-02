import React from "react";
import "./Buttons.css";

export const Buttons = ({ classNameText, onClickEvent, buttonText }) => {
  return (
    <button className={classNameText} onClick={onClickEvent}>
      {buttonText}
    </button>
  );
};
