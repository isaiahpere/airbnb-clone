import React from "react";
import styled from "styled-components";

import PlaceInfoLeft from "./PlaceInfoLeft";
import PlaceInfoRight from "./PlaceInfoRight";

const Section = styled.div`
  display: flex;
  width: 100%;
  margin-top: 60px;
`;

const PlaceInfo = ({ place }) => {
  return (
    <Section>
      <PlaceInfoLeft place={place} />
      <PlaceInfoRight place={place} />
    </Section>
  );
};

export default PlaceInfo;
