import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../modules/navbar";

const Container = styled.div`
  padding: 0px 0px;
  @media (min-width: 768px) {
    padding: 0px 30px;
  }
  @media (min-width: 1024px) {
    padding: 0px 50px;
  }
`;

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
