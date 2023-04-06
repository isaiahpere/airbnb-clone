import React from "react";
import styled from "styled-components";

import { Flex } from "../../home";
import Dot from "../../../components/Dot";
import face from "../../../assets/face.jpg";

const infoData = ["8 guests", "3 bedrooms", "5 beds", "2 baths"];

const Section = styled(Flex)`
  justify-content: space-between;
  padding-bottom: 40px;
`;

const Container = styled.div``;

const HostImageContainer = styled(Flex)`
  width: 80px;
  height: 80px;
`;

const HostPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 400;
`;

const PlaceInfoContainer = styled(Flex)`
  justify-content: flex-start;
`;

const PlaceContainer = styled(PlaceInfoContainer)``;

const PlaceInfo = styled.span`
  font-size: 16px;
  font-weight: 300;
`;

const PlaceInfoLeftHeader = () => {
  return (
    <Section>
      <Container>
        <Title>{`Entire place hosted by Isaiah`}</Title>
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
