import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const NavTabs = [
  { path: "/account/?", title: "My Profile", tabName: "profile" },
  { path: "/account/bookings", title: "My Bookings", tabName: "bookings" },
  { path: "/account/places", title: "My Places", tabName: "places" },
];

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const LinkContainer = styled.div`
  padding: 4px 12px;
  border-radius: 24px;
  ${(props) => props.isActive && `background-color: #f3eeee;`}
`;

const LinkItem = styled(Link)`
  font-size: 14px;
`;

/**
 *
 * @param {Text} activePage the current active account section (ie. profile or bookings)
 */
const AccountNav = ({ activePage }) => {
  return (
    <LinksContainer>
      {NavTabs.map((item) => (
        <LinkContainer
          key={item.tabName}
          isActive={activePage === item.tabName}
        >
          <LinkItem to={item.path}>{item.title}</LinkItem>
        </LinkContainer>
      ))}
    </LinksContainer>
  );
};

export default AccountNav;
