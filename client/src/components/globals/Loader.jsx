import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 30px;
  ${(props) =>
    props.center &&
    `
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const Loader = ({ center }) => {
  return <Container center={center}>Loading....</Container>;
};

export default Loader;
