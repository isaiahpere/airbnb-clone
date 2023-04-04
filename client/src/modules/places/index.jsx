import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utilities/context/userContext";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import AddButton from "./AddButton";
import axios from "axios";
import { Flex } from "../../pages/Home";

const Section = styled.div``;

const Container = styled(Flex)`
  justify-content: flex-start;
  margin-top: 20px;
  padding: 0px 30px;
  gap: 30px;
`;

const PlaceCard = styled(Link)`
  width: 272px;
  height: 360px;
  flex-direction: column;
  cursor: pointer;
`;

const PlaceImageContainer = styled(Flex)`
  align-items: flex-start;
  width: 100%;
  height: 260px;
  border-radius: 24px;
  margin-bottom: 10px;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const PlaceInfoConatiner = styled.div``;

const PlaceCityState = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const PlaceMiles = styled.p`
  font-size: 12px;
  color: #616060;
  margin-bottom: 2px;
`;

const PriceDollar = styled.p`
  font-size: 12px;
  color: #000;
  font-weight: 600;
`;

const PriceText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #616060;
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
      <AddButton />
      <Container>
        {places &&
          places.map((place) => (
            <PlaceCard key={place._id} to={`/account/places/${place._id}`}>
              {place.photos.length > 0 && (
                <PlaceImageContainer>
                  <PlaceImage
                    src={`${process.env.REACT_APP_API_PHOTO_UPLOAD_URL}${place.photos[0]}`}
                  />
                </PlaceImageContainer>
              )}
              <PlaceInfoConatiner>
                <PlaceCityState>{`${place.city}, ${place.state}`}</PlaceCityState>
                <PlaceMiles>173 miles away</PlaceMiles>
                <PriceDollar>
                  $560,80 <PriceText>night</PriceText>
                </PriceDollar>
              </PlaceInfoConatiner>
            </PlaceCard>
          ))}
      </Container>
    </Section>
  );
};

export default PlacesModule;
