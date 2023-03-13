import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../../utilities/context/userContext";

const LinkContainer = styled(Link)`
  display: flex;
  gap: 10px;
  padding: 0px 20px;
  border-radius: 24px;
  align-items: center;
  border: solid 1px #dddddd;
  height: 42px;
  text-decoration: none;
`;

const Hamburger = styled(RxHamburgerMenu)`
  font-size: 24px;
  color: #222222;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  color: #717171;
`;

const UserName = styled.span`
  font-size: 12px;
  color: #242424;
`;

const NavRight = () => {
  // user context
  const { user } = useContext(UserContext);

  return (
    <LinkContainer to={!!user ? "/account" : "/login"}>
      <Hamburger />
      <UserIcon />
      {!!user && <UserName>{user.name}</UserName>}
    </LinkContainer>
  );
};

export default NavRight;
