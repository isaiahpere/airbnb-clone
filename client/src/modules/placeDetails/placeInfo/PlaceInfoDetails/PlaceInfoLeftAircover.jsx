import React from "react";
import styled from "styled-components";
import { Flex } from "../../../home";

const Section = styled(Flex)`
  margin-top: 30px;
  align-items: flex-start;
  flex-direction: column;
`;

const TitleContainer = styled.div``;

const Title = styled.span`
  color: #ff385c;
  font-size: 44px;
  letter-spacing: -2px;
  font-weight: 600;
  margin-bottom: 20px;
  &:nth-child(2) {
    color: #000;
  }
`;

const Text = styled.p`
  font-size: 18px;
  color: #222;
`;

const PlaceInfoLeftAircover = () => {
  return (
    <Section>
      <TitleContainer>
        <Title>air</Title>
        <Title>cover</Title>
      </TitleContainer>
      <Text>
        Every booking includes free protection from Host cancellations, listing
        inaccuracies, and other issues like trouble checking in.
      </Text>
    </Section>
  );
};

export default PlaceInfoLeftAircover;
