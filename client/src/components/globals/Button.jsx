import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  background-color: #ff385b;
  cursor: pointer;

  /* conditional */
  ${(props) =>
    props.color &&
    `
    backgound-color: ${props.color};
  `}
  ${(props) =>
    props.radius &&
    `
    border-radius: ${props.radius};
  `}
  ${(props) =>
    props.width &&
    `
    width: ${props.width};
  `}
  ${(props) =>
    props.height &&
    `
    height: ${props.height};
  `}
  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
  ${(props) =>
    props.padding &&
    `
    padding: ${props.padding};
  `}
`;

const Button = ({
  color,
  padding,
  radius,
  children,
  width,
  height,
  fullWidth,
}) => {
  return (
    <CustomButton
      color={color}
      padding={padding}
      height={height}
      width={width}
      radius={radius}
      fullWidth={fullWidth}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
