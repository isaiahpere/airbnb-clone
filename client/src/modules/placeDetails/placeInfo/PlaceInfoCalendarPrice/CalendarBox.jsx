import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

import { Flex } from "../../../home";

const Section = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  border: 1.5px solid #b0b0b0;
  border-radius: 14px;
`;

const CheckInfoContainer = styled(Flex)`
  width: 100%;
`;

const DateSpanBold = styled.span`
  /* padding-left: 3px; */
  font-size: 14px;
  font-weight: 500;
`;

const DateSpan = styled.span`
  font-size: 16px;
  font-weight: 300;
`;

const CalendarBoxDate = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  height: 70px;
  padding: 10px;
  border-right: 1.5px solid #b0b0b0;
  border-bottom: 1.5px solid #b0b0b0;
  ${(props) =>
    props.noBorder &&
    `
    border: none;
  `}
  ${(props) =>
    props.noPadding &&
    `
    padding: 0px;
  `}
  &:nth-of-type(2) {
    border-right: none;
  }
`;

const GuestContainer = styled(Flex)`
  width: 100%;
  height: 70px;
  padding: 10px;
  justify-content: space-between;
`;

const ArrowDown = styled(IoIosArrowDown)`
  font-size: 18px;
`;

const CalendarBox = () => {
  return (
    <Section>
      <CheckInfoContainer>
        <CalendarBoxDate>
          <DateSpanBold>CHECK-IN</DateSpanBold>
          <DateSpan>04/03/2023</DateSpan>
        </CalendarBoxDate>
        <CalendarBoxDate>
          <DateSpanBold>CHECKOUT</DateSpanBold>
          <DateSpan>04/10/2023</DateSpan>
        </CalendarBoxDate>
      </CheckInfoContainer>
      <GuestContainer>
        <CalendarBoxDate noBorder noPadding>
          <DateSpanBold>GUEST</DateSpanBold>
          <DateSpan>1 guest</DateSpan>
        </CalendarBoxDate>
        <ArrowDown />
      </GuestContainer>
    </Section>
  );
};

export default CalendarBox;
