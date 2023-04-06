import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  width: 100%;
  margin: 0px auto;
  ${(props) =>
    props.marginTopTablet &&
    `
    margin-top: ${props.marginTopTablet}px;
  `}
  @media (min-width: 768px) {
    ${(props) =>
      props.marginTop &&
      `
    margin-top: ${props.marginTop}px;
  `}
    max-width: 100%;
  }
  @media (min-width: 1024px) {
    max-width: 100%;
  }
  @media (min-width: 1440px) {
    max-width: 1100px;
  }
`;

const PlaceDetailsMaxContainer = ({ children, marginTop, marginTopTablet }) => {
  return (
    <Container marginTop={marginTop} marginTopTablet={marginTopTablet}>
      {children}
    </Container>
  );
};

export default PlaceDetailsMaxContainer;
