import React from "react";
import styled from "styled-components/macro";

import { Flex } from "./FlexContainer";

const Card = styled.div`
  width: 100%;
  transition: transform 0.7s ease;
  @media (min-width: 1024px) {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const CardImageContainer = styled.div`
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

const CancelContainer = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const CancelButton = styled(Flex)`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: #fff;
  background-color: #ff385c;
  border-radius: 14px;
  cursor: pointer;
  &:hover {
    background-color: #ec2f51;
  }
`;

const BookingPlaceCard = ({ place, booking, deleteBooking }) => {
  const handleBookingCancel = async () => {
    deleteBooking({
      ownerId: booking.ownerId,
      placeId: place._id,
      bookingId: booking._id,
    });
  };

  console.log("place");
  console.log(place);

  return (
    <Card>
      {place.photos.length > 0 && (
        <CardImageContainer>
          <CardImage src={place.photos[0].url} />
        </CardImageContainer>
      )}
      <CancelContainer onClick={handleBookingCancel}>
        <CancelButton>Cancel Booking</CancelButton>
      </CancelContainer>
    </Card>
  );
};

export default BookingPlaceCard;
