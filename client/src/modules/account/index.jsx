import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";

import UserContext from "../../utilities/context/userContext";
import Loader from "../../components/globals/Loader";
import Button from "../../components/globals/Button";

const Section = styled.div``;

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

/**
 *
 * @param {Text} activePage the current active account section (ie. profile or bookings)
 */
const AccountModule = () => {
  // user context
  const { user, loading, setUser } = useContext(UserContext);

  // state
  const [redirect, setRedirect] = useState("");

  const handleLogout = async () => {
    const res = await axios.post("/logout");
    if (res?.data?.redirect) {
      setUser(null);
      setRedirect("/");
    }
  };

  if (!user) return <Navigate to="/login" />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <Section>
      {loading && <Loader center />}
      {!loading && user && (
        <Container>
          <Info>
            Logged in as <NameText>{user.name}</NameText>
            <EmailText>{` - ${user.email}`}</EmailText>
          </Info>
          <ButtonContainer onClick={handleLogout}>
            <Button fullWidth radius="24px" padding="10px 0px">
              Logout
            </Button>
          </ButtonContainer>
        </Container>
      )}
    </Section>
  );
};

export default AccountModule;
