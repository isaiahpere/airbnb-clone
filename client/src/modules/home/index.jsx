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
  margin-top: 56px;
  padding: 0px 10px;
  gap: 30px;
  @media (min-width: 550px) {
    padding: 0px 20px;
  }
  @media (min-width: 1024px) {
    padding: 0px 40px;
  }
  @media (min-width: 1440px) {
    padding: 0px 80px;
  }
`;

const HomeModule = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    const getAllPlaces = async () => {
      const places = await axios.get("/all-places");
      setAllPlaces(places.data);
    };
    getAllPlaces();
  }, []);

  console.log("all the places are: ");
  console.log(allPlaces);
  return (
    <Section>
      <GridContainer>
        {allPlaces.length > 0 &&
          allPlaces.map((place) => <PlaceCard key={place._id} place={place} />)}
      </GridContainer>
    </Section>
  );
};

export default HomeModule;
