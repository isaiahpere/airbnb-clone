import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../utilities/context/userContext";
import PerksForms from "./PerksForms";
import PhotosForms from "./PhotosForms";

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 36px;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 18px;
`;

export const Input = styled.input`
  ${(props) =>
    props.error &&
    `
    border: 1px solid #ff385c !important;
  `}
`;

const TextArea = styled.textarea`
  border-radius: 6px;
  resize: vertical;
`;

const CheckinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 6px;
  margin-top: 6px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CheckinItem = styled.div``;

const CheckinSubtitle = styled.h3`
  font-size: 10px;
  font-weight: 500;
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  font-size: 14px;
  height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  border-radius: 24px;
  background-color: #ff385b;
  margin-top: 24px;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 40vw;
  }
`;

const NewPlaceFormModule = () => {
  // User Context
  const { user } = useContext(UserContext); // used to send for owner in DB places

  // get place id from params
  const { id } = useParams(); // if id found, place is not new

  // state
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [pricePerNight, setPricePerNight] = useState(100);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [checkin, setCheckin] = useState(9);
  const [checkout, setCheckout] = useState(15);
  const [maxGuest, setMaxGuest] = useState(1);
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photosError, setphotosError] = useState(false);
  const [redirect, setRedirect] = useState("");

  // check if id exist - if it does then grab the data for the place
  // if not then the form is create new place
  useEffect(() => {
    if (!id) return;
    const getPlace = async () => {
      const placeInfo = await axios.get(`/place/${id}`);
      if (placeInfo) {
        console.log(placeInfo);
        setTitle(placeInfo.data?.title);
        setAddress(placeInfo.data?.address);
        setCity(placeInfo.data?.city);
        setState(placeInfo.data?.state);
        setPricePerNight(placeInfo.data?.pricePerNight.toFixed(2));
        setDescription(placeInfo.data?.description);
        setPerks(placeInfo.data?.perks);
        setAdditionalInfo(placeInfo.data?.additionalInfo);
        setCheckin(
          placeInfo.data?.checkin.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        );
        setCheckout(
          placeInfo.data?.checkout.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        );
        setMaxGuest(placeInfo.data?.maxGuest);
        setAddedPhotos(placeInfo.data?.photos);
      }
    };
    getPlace();
  }, [id]);

  /**
   * handle uploading photo by link (one at time)
   * @param {*} e
   */
  const handleLinkPhotoUpload = async (e) => {
    e.preventDefault();

    if (photoLink) {
      const { data: fileName } = await axios.post("/link-uploads", {
        link: photoLink,
      });
      setAddedPhotos((prev) => [...prev, fileName]);
    }
    // reset
    setPhotoLink("");
  };

  /**
   * handle bulk photo upload (array)
   * @param {*} e
   */
  const handleBulkPhotoUpload = async (e) => {
    e.preventDefault();
    // get files
    let files = e.target.files;

    // create form multipart data
    const data = new FormData();

    const dataArray = Array.from(files);
    dataArray.forEach((item) => {
      data.append("photos", item);
    });

    // send files to backend to upload
    // returns array of paths - to images
    const { data: fileNames } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // add photos to state
    setAddedPhotos((prev) => [...prev, ...fileNames]);
  };

  /**
   * handle form submission
   * @param {*} e form submit event
   */
  const handleSavePlace = async (e) => {
    e.preventDefault();

    // ****
    // VALIDATION
    // ****
    // check title is not empty
    if (title.length < 5) {
      setTitleError(true);
    } else setTitleError(false);

    if (city.length < 5) {
      setCityError(true);
    } else setCityError(false);

    if (state.length < 2) {
      setStateError(true);
    } else setStateError(false);

    // check user has at least 6 images for the place
    if (addedPhotos.length < 6) setphotosError(true);

    // check if form is incomplete
    if (
      title.length < 5 ||
      city.length < 5 ||
      state.length < 2 ||
      addedPhotos.length < 6
    )
      return;

    // no user === send to login
    if (!user) {
      return setRedirect("/login");
    }

    // create object for place data
    const placeData = {
      ownerId: user.id,
      title,
      address,
      city,
      state,
      pricePerNight,
      description,
      perks,
      additionalInfo,
      checkin,
      checkout,
      maxGuest,
      addedPhotos,
    };

    // id === place needs to be updated
    if (id) {
      const updatedPlace = await axios.put("/places", {
        placeId: id,
        ...placeData,
      });
      console.log(updatedPlace);
    } else {
      // !id === place needs to be created
      const { data } = await axios.post("/places", placeData);
      console.log(data);
    }

    // redirect to places
    setRedirect("/account/places");
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <Container>
      <Form onSubmit={handleSavePlace}>
        <InputContainer>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Title (ie. My Comfy Chome)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
          />
        </InputContainer>
        <InputContainer>
          <Label>Address</Label>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>City</Label>
          <Input
            type="text"
            placeholder="Los Angeles"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={cityError}
          />
        </InputContainer>
        <InputContainer>
          <Label>State</Label>
          <Input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={stateError}
          />
        </InputContainer>
        <InputContainer>
          <Label>Price Per Night ($)</Label>
          <Input
            type="number"
            placeholder="$200.00"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Description</Label>
          <TextArea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
        <PerksForms setPerk={setPerks} selectedPerks={perks} />
        <InputContainer>
          <Label>Additional Info</Label>
          <TextArea
            rows={3}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Check-in & Check-out</Label>
          <CheckinGrid>
            <CheckinItem>
              <CheckinSubtitle>Check-in Time</CheckinSubtitle>
              <Input
                type="number"
                placeholder="11"
                min={1}
                max={24}
                step={1}
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </CheckinItem>
            <CheckinItem>
              <CheckinSubtitle>Check-Out Time</CheckinSubtitle>
              <Input
                type="number"
                min={1}
                max={24}
                step={1}
                placeholder="15"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </CheckinItem>
            <CheckinItem>
              <CheckinSubtitle>Max Guest</CheckinSubtitle>
              <Input
                type="number"
                max={20}
                placeholder="12"
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
              />
            </CheckinItem>
          </CheckinGrid>
        </InputContainer>
        <PhotosForms
          photoUrl={photoLink}
          setPhotoUrl={setPhotoLink}
          handleAddPhotoUrl={handleLinkPhotoUpload}
          handleAddedPhotos={setAddedPhotos}
          handleBulkPhotoHandler={handleBulkPhotoUpload}
          selectedBulkPhotos={addedPhotos}
          photoUploadError={photosError}
        />
        <ButtonContainer>
          <SubmitButton type="submit">Save</SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default NewPlaceFormModule;
