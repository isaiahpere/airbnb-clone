import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../utilities/context/userContext";

import BookingsModule from "../../modules/bookings";
import axios from "axios";

const Bookings = () => {
  // user context
  const { user } = useContext(UserContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getAllBookings = async () => {
      const { data } = await axios.get("/bookings");

      setBookings(data);
    };
    getAllBookings();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return <BookingsModule allBookings={bookings} />;
};

export default Bookings;
