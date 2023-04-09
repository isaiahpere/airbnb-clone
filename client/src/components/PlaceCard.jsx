import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { Flex } from "./FlexContainer";

const Card = styled(Link)`
  width: 100%;
  cursor: pointer;
`;

const CardImageContainer = styled(Flex)`
  justify-content: flex-start;
  display: block;
  height: 286px;
  background-color: red;
  border-radius: 24px;
  @media (min-width: 1130px) {
    height: 260px;
  }
  @media (min-width: 1200px) {
    height: 300px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const CardInfoContainer = styled.div`
  margin-top: 4px;
  @media (min-width: 768px) {
    margin-top: 8px;
  }
`;

const CardCityState = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const CardMiles = styled.p`
  font-size: 12px;
  color: #616060;
  margin-bottom: 2px;
`;

const CardDollar = styled.p`
  font-size: 12px;
  color: #000;
  font-weight: 600;
`;

const CardText = styled.span`
  font-size: 12px;
  margin-left: 4px;
  font-weight: 400;
  color: #616060;
`;

const PlaceCard = ({ place, toDetails }) => {
  let redirectLink = toDetails
    ? `/place/${place._id}`
    : `/account/places/${place._id}`;

  return (
    <Card to={redirectLink}>
      {place.photos.length > 0 && (
        <CardImageContainer>
          <CardImage src={place.photos[0].url} />
        </CardImageContainer>
      )}
      <CardInfoContainer>
        <CardCityState>{`${place.city}, ${place.state}`}</CardCityState>
        <CardMiles>173 miles away</CardMiles>
        <CardDollar>
          ${place.pricePerNight.toFixed(2)}
          <CardText>night</CardText>
        </CardDollar>
      </CardInfoContainer>
    </Card>
  );
};

export default PlaceCard;
