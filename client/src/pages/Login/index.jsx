import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../utilities/context/userContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 100px);
  padding: 0px 14px;
`;

const PageTitle = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-bottom: 14px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    width: 400px;
  }
`;

const FormInput = styled.input`
  width: 100%;
  border: solid 1px #dddddd;
  border-radius: 24px;
  padding: 10px 20px;
  margin-bottom: 8px;
`;

const FormButton = styled.button`
  background-color: #ff385b;
  width: 100%;
  color: white;
  text-align: center;
  font-size: 14px;
  padding: 10px 0px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
`;

const RegisterContainer = styled.div`
  margin-top: 18px;
  font-size: 14px;
`;

const RegisterLink = styled(Link)`
  text-underline-offset: 2px;
  padding-left: 4px;
  color: #242424;
  font-weight: 800;
`;

const Login = () => {
  // state
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // context
  const { user, setUser } = useContext(UserContext);

  // userContext attempts to auth user by token.
  useEffect(() => {
    if (user) setRedirect(true);
  }, [user]);

  /**
   * handle login
   * @param {*} e
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // send login request to server
    try {
      const user = await axios.post("/login", {
        email: inputEmail,
        password: inputPassword,
      });

      // check if user is authenticated
      if (user?.data?.user) {
        setUser(user?.data?.user);
        setRedirect(true);
      }
    } catch (error) {
      console.log("login failed ");
      console.log(error);
    }

    // reset values
    setInputEmail("");
    setInputPassword("");
  };

  // if user found redirect is set to true to send user homepage
  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container>
      <PageTitle className="text-4xl text-center mb-4">Login</PageTitle>
      <Form onSubmit={handleLogin}>
        <FormInput
          type="email"
          placeholder="johnDoe@gmail.com"
          name="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="enter password"
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <FormButton>Login</FormButton>
        <RegisterContainer>
          Don't have an account yet?
          <RegisterLink to="/register">Register</RegisterLink>
        </RegisterContainer>
      </Form>
    </Container>
  );
};

export default Login;
