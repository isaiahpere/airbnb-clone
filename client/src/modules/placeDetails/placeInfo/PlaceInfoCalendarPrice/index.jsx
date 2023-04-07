import React from "react";
import styled from "styled-components";

import PlaceInfoRightCalendar from "./PlaceInfoRightCalendar";
import { Flex } from "../../../home";

const Section = styled(Flex)`
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 80px;
  padding: 0px 10px;
  @media (min-width: 768px) {
    width: 40%;
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
  }
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const PlaceInfoCalendarPrice = ({ place }) => {
  return (
    <Section>
      <PlaceInfoRightCalendar place={place} />
    </Section>
  );
};

export default PlaceInfoCalendarPrice;
