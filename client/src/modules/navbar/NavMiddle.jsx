import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import Button from "../../components/globals/Button";

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 10px 16px;
  gap: 12px;
  border: solid 1px #dddddd;
  border-radius: 24px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Item = styled.div``;

const Separator = styled.div`
  height: 100%;
  border: solid 0.5px #dddddd;
`;

const Search = styled(BiSearch)`
  font-size: 18px;
`;

const NavMiddle = () => {
  return (
    <Container>
      <Item>Anywhere</Item>
      <Separator></Separator>
      <Item>Anyweek</Item>
      <Separator></Separator>
      <Item>Guest</Item>
      <Button radius="50%" width="24px" height="24px">
        <Search />
      </Button>
    </Container>
  );
};

export default NavMiddle;
