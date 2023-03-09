import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TbBrandAirbnb } from "react-icons/tb";

const Navlink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Logo = styled(TbBrandAirbnb)`
  font-size: 30px;
  color: black;
`;

const LogoText = styled.span`
  color: #242424;
  font-weight: 800;
`;

const NavLeft = () => {
  return (
    <Navlink to="/">
      <Logo />
      <LogoText>Airbnb</LogoText>
    </Navlink>
  );
};

export default NavLeft;
