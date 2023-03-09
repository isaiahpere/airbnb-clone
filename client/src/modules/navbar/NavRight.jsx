import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

const Container = styled(Link)`
  display: flex;
  gap: 10px;
  padding: 0px 20px;
  border-radius: 24px;
  align-items: center;
  border: solid 1px #dddddd;
  height: 42px;
`;

const Hamburger = styled(RxHamburgerMenu)`
  font-size: 24px;
  color: #222222;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  color: #717171;
`;

const NavRight = () => {
  return (
    <Container to="/login">
      <Hamburger />
      <UserIcon />
    </Container>
  );
};

export default NavRight;
