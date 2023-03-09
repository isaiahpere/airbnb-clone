import React from "react";
import styled from "styled-components";

import NavLeft from "./NavLeft";
import NavMiddle from "./NavMiddle";
import NavRight from "./NavRight";

const Nav = styled.header`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 16px 15px;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLeft />
      <NavMiddle />
      <NavRight />
    </Nav>
  );
};

export default Navbar;
