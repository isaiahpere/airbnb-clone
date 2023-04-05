import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../modules/navbar";

const Container = styled.div`
  padding: 0px 10px;
`;

// fix the padding of navbar and grid container by passing padding here in layout

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
