import React from "react";
import styled from "styled-components";

import HorizontalRule from "../../../components/HorizontalRule";
import PlaceInfoLeftHeader from "./PlaceInfoLeftHeader";
import PlaceInfoLeftHighlights from "./PlaceInfoLeftHighlights";
import PlaceInfoLeftAircover from "./PlaceInfoLeftAircover";

const Section = styled.div`
  width: 60%;
`;

const Temporary = styled.div`
  margin-top: 200px;
`;

const PlaceInfoLeft = ({ place }) => {
  return (
    <Section>
      <PlaceInfoLeftHeader />
      <HorizontalRule />
      <PlaceInfoLeftHighlights />
      <HorizontalRule />
      <PlaceInfoLeftAircover />
      <Temporary />
    </Section>
  );
};

export default PlaceInfoLeft;
