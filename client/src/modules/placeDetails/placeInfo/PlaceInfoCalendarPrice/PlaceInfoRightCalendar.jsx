import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../../../utilities/context/userContext";

import { Flex } from "../../../home";
import CalendarBox from "./CalendarBox";
import HeaderContent from "./HeaderContent";
import axios from "axios";

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 300px;
  padding: 24px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  @media (min-width: 768px) {
    width: 280px;
  }
  @media (min-width: 1024px) {
    width: 340px;
  }
  @media (min-width: 1200px) {
    width: 380px;
  }
`;

const ReserveButton = styled(Flex)`
  width: 100%;
  height: 60px;
  font-size: 18px;
  color: #fff;
  background-color: #ff385c;
  border-radius: 14px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ec2f51;
  }
`;

const ChargeText = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #777;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const PriceDetailsContainer = styled(Flex)`
  width: 100%;
  margin-top: 16px;
  justify-content: space-between;
`;

const PriceDetails = styled.p`
  font-size: 16px;
  font-weight: 300;
  text-decoration: underline;
  text-underline-offset: 2px;
  ${(props) =>
    props.noUnderline &&
    `
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
  `}
  @media (min-width: 768px) {
    font-size: 18px;
    ${(props) =>
      props.noUnderline &&
      `
    text-decoration: none;
    font-size: 18px;
  `}
  }
`;

const PlaceInfoRightCalendar = ({ place }) => {
  // user context
  const { user } = useContext(UserContext); // owner id

  // state
  const [redirect, setRedirect] = useState("");

  // convert price to commas number
  const totalPrice = (place.pricePerNight * 8).toLocaleString().split(".")[0];

  const handleReservation = async () => {
    if (!place?._id || !user?.id) return setRedirect("/login");

    console.log("SHOULD NOT SHOW UP");
    // make request to save booking
    const response = await axios.post("/bookings", {
      ownerId: user.id,
      placeId: place._id,
    });
    console.log(response);
    setRedirect("/account/bookings");
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <Container>
      <HeaderContent price={place.pricePerNight} />
      <CalendarBox />
      <ReserveButton onClick={handleReservation}>RESERVE</ReserveButton>
      <ChargeText>You won't be charge yet</ChargeText>
      <PriceDetailsContainer>
        <PriceDetails>{`$${Math.round(
          place.pricePerNight
        )} X 8 nights`}</PriceDetails>
        <PriceDetails noUnderline>{`$${totalPrice}`}</PriceDetails>
      </PriceDetailsContainer>
    </Container>
  );
};

export default PlaceInfoRightCalendar;
