import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 100px);
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
  width: 400px;
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
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Container>
      <PageTitle className="text-4xl text-center mb-4">Login</PageTitle>
      <Form onSubmit={submitHandler}>
        <FormInput type="email" placeholder="johnDoe@gmail.com" />
        <FormInput type="password" placeholder="enter password" />
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