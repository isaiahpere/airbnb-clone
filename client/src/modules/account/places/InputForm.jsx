import React from "react";
import styled from "styled-components/macro";

import { Input, InputContainer } from "./NewPlaceForm";

const InputForm = ({
  inputType,
  inputPlaceholder,
  inputValue,
  handleInput,
}) => {
  const handleInputChange = (e) => {
    handleInput(e.target.value);
  };

  return (
    <>
      <Input
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
};

export default InputForm;
