import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import GridContainer from "../../components/GridContainer";
import PlaceCard from "../../components/PlaceCard";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled(Flex)`
  margin: 56px 0px;
  padding: 0px 14px;
`;

const HomeModule = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    const getAllPlaces = async () => {
      const places = await axios.get("/places");
      setAllPlaces(places.data);
    };
    getAllPlaces();
  }, []);

  return (
    <Section>
      <GridContainer>
        {allPlaces.length > 0 &&
          allPlaces.map((place) => (
            <PlaceCard key={place._id} place={place} toDetails />
          ))}
      </GridContainer>
    </Section>
  );
};

export default HomeModule;
