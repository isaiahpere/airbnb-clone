import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import NavLeft from "./NavLeft";
import NavMiddle from "./NavMiddle";
import NavRight from "./NavRight";
import PlaceDetailsMaxContainer from "../../components/PlaceDetailsMaxContainer";

const Nav = styled.header`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 10px 24px;
  justify-content: space-between;
  @media (min-width: 768px) {
    padding: 16px 0px;
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();
  let isMaxwidthRoute = pathname.includes(`/place/`);

  return (
    <>
      {isMaxwidthRoute ? (
        <PlaceDetailsMaxContainer>
          <Nav>
            <NavLeft />
            <NavMiddle />
            <NavRight />
          </Nav>
        </PlaceDetailsMaxContainer>
      ) : (
        <Nav>
          <NavLeft />
          <NavMiddle />
          <NavRight />
        </Nav>
      )}
    </>
  );
};

export default Navbar;
