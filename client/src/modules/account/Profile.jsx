import React from "react";
import styled from "styled-components/macro";

import Button from "../../components/globals/Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Info = styled.div`
  margin-bottom: 10px;
`;

const EmailText = styled.span`
  color: #646161;
`;

const NameText = styled.span`
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  width: 300px;
`;

const Profile = ({ userInfo, logoutUser }) => {
  const handleUserLogout = () => {
    logoutUser();
  };

  return (
    <Container>
      <Info>
        Logged in as <NameText>{userInfo.name}</NameText>
        <EmailText>{` - ${userInfo.email}`}</EmailText>
      </Info>
      <ButtonContainer onClick={handleUserLogout}>
        <Button fullWidth radius="24px" padding="10px 0px">
          Logout
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Profile;
