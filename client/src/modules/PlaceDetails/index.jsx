import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlaceDetailsModule = () => {
  const { id } = useParams();

  return (
    <div>
      <div>{`details page for id ${id}`}</div>
      <div>This is the details page of a single palce</div>
    </div>
  );
};

export default PlaceDetailsModule;
