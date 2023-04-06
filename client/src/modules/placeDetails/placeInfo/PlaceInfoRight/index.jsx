import React from "react";
import styled from "styled-components";

import PlaceInfoRightCalendar from "./PlaceInfoRightCalendar";
import PlaceInfoRightRareContent from "./PlaceInfoRightRareContent";
import { Flex } from "../../../home";

const Section = styled(Flex)`
  width: 40%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const PlaceInfoRight = () => {
  return (
    <Section>
      <PlaceInfoRightCalendar />
      <PlaceInfoRightRareContent />
    </Section>
  );
};

export default PlaceInfoRight;
