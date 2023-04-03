import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";

import { getPathname } from "../utilities/helpers/helpers";

const NavTabs = [
  {
    path: "/account",
    pathName: "account",
    title: "My Profile",
    tabName: "profile",
  },
  {
    path: "/account/bookings",
    pathName: "bookings",
    title: "My Bookings",
    tabName: "bookings",
  },
  {
    path: "/account/places",
    pathName: "places",
    title: "My Places",
    tabName: "places",
  },
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
const LayoutAccountLinks = () => {
  const { pathname } = useLocation();
  const urlPath = getPathname(pathname);

  return (
    <>
      <LinksContainer>
        {NavTabs.map((item) => (
          <LinkContainer
            key={item.tabName}
            isActive={item.pathName === urlPath}
          >
            <LinkItem to={item.path}>{item.title}</LinkItem>
          </LinkContainer>
        ))}
      </LinksContainer>
      <Outlet />
    </>
  );
};

export default LayoutAccountLinks;
