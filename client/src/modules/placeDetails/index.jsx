import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceHeader from "./PlaceHeader";
import PlaceDetailsMaxContainer from "../../components/PlaceDetailsMaxContainer";
import PhotosGrid from "./PhotosGrid";
import AllPhotos from "./AllPhotos";
import PlaceInfo from "./placeInfo";

const PlaceDetailsModule = () => {
  // state
  const [place, setPlace] = useState({});
  const { id } = useParams();
  const [showPhotosModal, setShowPhotosModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const getPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data);
    };
    getPlace();
  }, [id]);

  if (!place) return;

  if (showPhotosModal) {
    return (
      <AllPhotos
        onTogglePhotosModal={setShowPhotosModal}
        photos={place.photos}
      />
    );
  }

  return (
    <PlaceDetailsMaxContainer marginTopTablet={15} marginTop={30}>
      <PlaceHeader place={place} />
      <PhotosGrid place={place} onChangeAllPhotos={setShowPhotosModal} />
      <PlaceInfo place={place} />
    </PlaceDetailsMaxContainer>
  );
};

export default PlaceDetailsModule;
