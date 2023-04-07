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
  color: #ff385c;
  @media (min-width: 768px) {
    font-size: 40px;
  }
  @media (min-width: 1024px) {
    font-size: 60px;
  }
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #ff385c;
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 1024px) {
    font-size: 30px;
  }
`;

const NavLeft = () => {
  return (
    <Navlink to="/">
      <Logo />
      <LogoText>aircnc</LogoText>
    </Navlink>
  );
};

export default NavLeft;
