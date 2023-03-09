import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../modules/navbar";

const Container = styled.div``;

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
