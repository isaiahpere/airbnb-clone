import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TbBrandAirbnb } from "react-icons/tb";

import Search from "./globals/SVG/Search";
import Hamburger from "./globals/SVG/Hamburger";
import User from "./globals/SVG/User";

const Nav = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(TbBrandAirbnb)`
  font-size: 30px;
  color: black;
`;

const Navlink = styled(Link)`
  display: flex;
`;

const Div = styled.div``;

const Header = () => {
  return (
    <Nav>
      <Navlink to="/">
        <Logo />
        <span className="font-bold text-xl">Airbnb</span>
      </Navlink>
      <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Anyweek</div>
        <div className="border-l border-gray-300"></div>
        <div>Guest</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <Search />
        </button>
      </div>
      <Link
        to="/login"
        className="flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2"
      >
        <Hamburger />
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <User />
        </div>
      </Link>
    </Nav>
  );
};

export default Header;
