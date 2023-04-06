import React from "react";
import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { Flex } from "./FlexContainer";

const Container = styled(Flex)`
  margin: 0px 4px;
  padding-top: 2px; // alignment correction
`;

const DotIcon = styled(BsDot)`
  font-size: 16px;
`;

const Dot = () => {
  return (
    <Container>
      <DotIcon />
    </Container>
  );
};

export default Dot;
