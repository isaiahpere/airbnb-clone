import React from "react";
import styled from "styled-components";

import HorizontalRule from "../../../../components/HorizontalRule";
import PlaceInfoLeftHeader from "./PlaceInfoLeftHeader";
import PlaceInfoLeftHighlights from "./PlaceInfoLeftHighlights";
import PlaceInfoLeftAircover from "./PlaceInfoLeftAircover";

const Section = styled.div`
  width: 100%;
  padding: 10px;
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const PlaceInfoDetails = ({ place }) => {
  return (
    <Section>
      <PlaceInfoLeftHeader />
      <HorizontalRule />
      <PlaceInfoLeftHighlights />
      <HorizontalRule />
      <PlaceInfoLeftAircover />
    </Section>
  );
};

export default PlaceInfoDetails;
