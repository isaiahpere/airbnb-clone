import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utilities/context/userContext";
import styled from "styled-components/macro";
import axios from "axios";

import GridContainer from "../../components/GridContainer";
import AddButton from "./AddButton";
import PlaceCard from "../../components/PlaceCard";

const Section = styled.div`
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

const PlacesModule = () => {
  // user context
  const { user } = useContext(UserContext);

  // state
  const [places, setPlaces] = useState([]);

  // fetch places on first load
  useEffect(() => {
    if (user) {
      const fetchPlaces = async () => {
        const { data } = await axios.get(`/places/byowner/${user.id}`);
        setPlaces(data);
      };

      fetchPlaces();
    }
  }, [user]);

  return (
    <Section>
      <AddButton spaceBottom={40} />
      <GridContainer>
        {places &&
          places.map((place) => <PlaceCard key={place._id} place={place} />)}
      </GridContainer>
    </Section>
  );
};

export default PlacesModule;
