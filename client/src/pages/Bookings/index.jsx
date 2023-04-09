import React, { useEffect, useState } from "react";

import BookingsModule from "../../modules/bookings";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getAllBookings = async () => {
      const { data } = await axios.get("/bookings");
      console.log("**************");
      console.log("printing all bookings");
      console.log(data);
      console.log("**************");

      setBookings(data);
    };
    getAllBookings();
  }, []);

  return <BookingsModule allBookings={bookings} />;
};

export default Bookings;
