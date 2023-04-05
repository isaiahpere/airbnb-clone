import React from "react";
import styled from "styled-components/macro";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlexContainer = ({ children }) => {
  return <Flex>{children}</Flex>;
};

export default FlexContainer;
