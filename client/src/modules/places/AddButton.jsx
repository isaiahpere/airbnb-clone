import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { BiPlus } from "react-icons/bi";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled(Flex)`
  ${(props) =>
    props.spaceBottom &&
    `
  margin-bottom: ${props.spaceBottom}px;
`}
`;

const LinkContainer = styled(Flex)`
  gap: 4px;
  background-color: #ff385b;
  width: 140px;
  height: 36px;
  border-radius: 24px;
`;

const PlusIcon = styled(BiPlus)`
  color: white;
  font-size: 14px;
`;

const AddLink = styled(Link)`
  font-size: 14px;
  color: white;
`;

const AddButton = ({ spaceBottom }) => {
  return (
    <ButtonContainer spaceBottom={spaceBottom}>
      <LinkContainer>
        <PlusIcon />
        <AddLink to="/account/places/new">Add New Place</AddLink>
      </LinkContainer>
    </ButtonContainer>
  );
};

export default AddButton;
