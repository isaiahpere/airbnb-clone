import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import FlexContainer from "./FlexContainer";

const Card = styled(Link)`
  width: 100%;
  max-height: 386px;
  cursor: pointer;
`;

const CardImageContainer = styled(FlexContainer)`
  width: 100%;
  height: 286px;
  border-radius: 24px;
  margin-bottom: 10px;
  @media (min-width: 1130px) {
    height: 280px;
  }
  @media (min-width: 1900px) {
    height: 280px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const CardInfoConatiner = styled.div``;

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

const PlaceCard = ({ place }) => {
  return (
    <Card to={`/account/places/${place._id}`}>
      {place.photos.length > 0 && (
        <CardImageContainer>
          <CardImage
            src={`${process.env.REACT_APP_API_PHOTO_UPLOAD_URL}${place.photos[0]}`}
          />
        </CardImageContainer>
      )}
      <CardInfoConatiner>
        <CardCityState>{`${place.city}, ${place.state}`}</CardCityState>
        <CardMiles>173 miles away</CardMiles>
        <CardDollar>
          ${place.pricePerNight.toFixed(2)}
          <CardText>night</CardText>
        </CardDollar>
      </CardInfoConatiner>
    </Card>
  );
};

export default PlaceCard;
