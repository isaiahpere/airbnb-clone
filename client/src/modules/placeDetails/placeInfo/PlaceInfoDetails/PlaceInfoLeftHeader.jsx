import React from "react";
import styled from "styled-components";

import { Flex } from "../../../home";
import Dot from "../../../../components/Dot";
import face from "../../../../assets/face.jpg";

const infoData = ["8 guests", "3 bedrooms", "5 beds", "2 baths"];

const Section = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 40px;
  }
`;

const Container = styled.div``;

const HostImageContainer = styled(Flex)`
  width: 120px;
  height: 120px;
  margin-top: 10px;
  @media (min-width: 768px) {
    display: flex;
    width: 80px;
    height: 80px;
    margin-top: 0;
  }
`;

const HostPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 24px;
  }
  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const PlaceInfoContainer = styled(Flex)`
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const PlaceContainer = styled(PlaceInfoContainer)``;

const PlaceInfo = styled.span`
  font-size: 14px;
  font-weight: 300;
  @media (min-width: 768px) {
    font-size: 12px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const PlaceInfoLeftHeader = () => {
  return (
    <Section>
      <Container>
        <Title>{`Place hosted by Isaiah`}</Title>
        <PlaceInfoContainer>
          {infoData.map((item, idx) => (
            <PlaceContainer key={item}>
              <PlaceInfo key={item}>{item}</PlaceInfo>
              {idx < infoData.length - 1 && <Dot />}
            </PlaceContainer>
          ))}
        </PlaceInfoContainer>
      </Container>
      <HostImageContainer>
        <HostPhoto src={face} />
      </HostImageContainer>
    </Section>
  );
};

export default PlaceInfoLeftHeader;
