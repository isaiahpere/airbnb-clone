import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (min-width: 1130px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1640px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 1900px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const GridContainer = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default GridContainer;
