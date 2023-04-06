import React from "react";
import styled from "styled-components";

import HorizontalRule from "../../../components/HorizontalRule";
import PlaceInfoLeftHeader from "./PlaceInfoLeftHeader";
import PlaceInfoLeftHighlights from "./PlaceInfoLeftHighlights";

const Section = styled.div`
  width: 60%;
`;

const AirCoverContainer = styled.div`
  margin-top: 30px;
`;

const PlaceInfoLeft = ({ place }) => {
  return (
    <Section>
      <PlaceInfoLeftHeader />
      <HorizontalRule />
      <PlaceInfoLeftHighlights />
      <AirCoverContainer></AirCoverContainer>
    </Section>
  );
};

export default PlaceInfoLeft;
