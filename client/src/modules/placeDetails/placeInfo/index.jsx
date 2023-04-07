import React from "react";
import styled from "styled-components";

import { Flex } from "../../home";
import PlaceInfoDetails from "./PlaceInfoDetails";
import PlaceInfoCalendarPrice from "./PlaceInfoCalendarPrice";

const Section = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-top: 30px;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 80px;
  }
`;

const PlaceInfo = ({ place }) => {
  return (
    <Section>
      <PlaceInfoDetails place={place} />
      <PlaceInfoCalendarPrice place={place} />
    </Section>
  );
};

export default PlaceInfo;
