import React from "react";
import styled from "styled-components";
import { ImSad } from "react-icons/im";

import { Flex } from "../home";
import GridContainer from "../../components/GridContainer";
import BookingPlaceCard from "../../components/BookingPlaceCard";
import axios from "axios";

const Section = styled(Flex)`
  padding: 0px 10px;
`;

const MessageContainer = styled(Flex)`
  margin-top: 40px;
`;

const Message = styled.p`
  font-size: 40px;
  color: #222;
  margin-right: 18px;
`;
const MessageIcon = styled(ImSad)`
  font-size: 30px;
`;

const BookingsModule = ({ allBookings }) => {
  // handler to delete one booked reservation
  const handleDeleteBooking = async ({ ownerId, placeId, bookingId }) => {
    axios.delete("/bookings", { data: { ownerId, placeId, bookingId } });

    // reload page
    window.location.reload(false);
  };

  return (
    <>
      {allBookings.length < 1 && (
        <MessageContainer>
          <Message>No Reservations Found!</Message>
          <MessageIcon />
        </MessageContainer>
      )}
      <Section>
        <GridContainer>
          {allBookings.length > 0 &&
            allBookings.map((booking) => (
              <BookingPlaceCard
                key={booking.placeId._id}
                place={booking.placeId}
                booking={booking}
                deleteBooking={handleDeleteBooking}
              />
            ))}
        </GridContainer>
      </Section>
    </>
  );
};

export default BookingsModule;
