// import React from "react";
// import "./Input.css";

// export const Input = ({
//   type,
//   className,
//   placeholderText,
//   name,
//   inputValue,
//   setInputValue,
//   setErrorInputField,
// }) => {
//   // Handling onBlur Event for input box
//   const onBlurEvent = (event) => {
//     const { name, value } = event.target;
//     let tempErrorObj = {
//       error: false,
//       errorMessage: "",
//     };

//     // Error handling for add todo
//     if (value === "" || value.length <= 2) {
//       tempErrorObj.error = true;
//       tempErrorObj.errorMessage =
//         "Please enter any todo with more than 3 characters";
//     } else {
//       tempErrorObj.error = false;
//       tempErrorObj.errorMessage = "";
//     }

//     setErrorInputField((prev) => ({
//       ...prev,
//       [name]: tempErrorObj,
//     }));
//   };

//   // Handling onChange Event for input box
//   const onChangeEvent = (event) => {
//     // setInputValue(event.target.value);
//     setInputValue((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//     onBlurEvent(event);
//   };
//   return (
//     <div className="input-container">
//       <input
//         type={type}
//         className={className}
//         name={name}
//         value={inputValue}
//         placeholder={placeholderText}
//         onChange={onChangeEvent}
//         onBlur={onBlurEvent}
//       />
//     </div>
//   );
// };

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
}) => {
  // Handling onBlur Event for input box
  const onBlurEvent = (event) => {
    const { name, value } = event.target;
    let tempErrorObj = {
      error: value === "" || value.length <= 2,
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
