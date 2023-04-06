import React from "react";
import styled from "styled-components";

import { Flex } from "../../../home";

const Container = styled.div`
  width: 240px;
  height: 400px;
  border: 2px solid #222;
  @media (min-width: 768px) {
    width: 260px;
  }
  @media (min-width: 1024px) {
    width: 340px;
  }
  @media (min-width: 1200px) {
    width: 372px;
  }
`;

const HeaderContainer = styled(Flex)``;

// Left off here. Need to finish the calendar for details page.

const PlaceInfoRightCalendar = () => {
  return <Container></Container>;
};

export default PlaceInfoRightCalendar;
