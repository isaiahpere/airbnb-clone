import React from "react";
import styled from "styled-components/macro";

const Container = styled.hr`
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 2px;
`;

const HorizontalRule = () => {
  return <Container />;
};

export default HorizontalRule;
