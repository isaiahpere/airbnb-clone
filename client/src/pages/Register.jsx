import React, { useState } from "react";
import axios from "axios";
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

const Register = () => {
  // state
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitted");

    console.log(`name: ${inputName}`);
    console.log(`email: ${inputEmail}`);
    console.log(`pass: ${inputPassword}`);

    // register request
    try {
      const res = await axios.post("/register", {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      });
      alert("registration successful - Welcome");
      console.log(res?.data);
    } catch (error) {
      console.log(error);
      alert("registration failed - try again");
    }

    // reset values
    setInputName("");
    setInputEmail("");
    setInputPassword("");
  };

  return (
    <Container>
      <PageTitle>Register</PageTitle>
      <Form onSubmit={submitHandler}>
        <FormInput
          type="text"
          placeholder="Name"
          name="name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <FormInput
          type="email"
          placeholder="Email"
          name="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <FormButton>Register</FormButton>
        <RegisterContainer>
          Have an account?
          <RegisterLink to="/login">Login</RegisterLink>
        </RegisterContainer>
      </Form>
    </Container>
  );
};

export default Register;
