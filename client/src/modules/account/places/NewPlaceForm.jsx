import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import UserContext from "../../../utilities/context/userContext";
import Perks from "./PerksForm";
import axios from "axios";
import PhotosForm from "./PhotosForm";

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

export const Input = styled.input``;

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

const NewPlaceForm = () => {
  // User Context
  const { user } = useContext(UserContext); // used to send for owner in DB places

  // state
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState("");

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
    console.log("dataArray");
    console.log(dataArray);

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
  const handleNewPlace = async (e) => {
    e.preventDefault();

    if (!user) {
      return setRedirect("/login");
    }

    // send server request to add new place
    const { data } = await axios.post("/places", {
      user: user.id,
      title,
      address,
      description,
      perks,
      additionalInfo,
      checkin,
      checkout,
      maxGuest,
      addedPhotos,
    });

    // redirect to places
    if (data) setRedirect("/account/places");
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <Container>
      <Form onSubmit={handleNewPlace}>
        <InputContainer>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Title (ie. My Comfy Chome)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Label>Description</Label>
          <TextArea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
        <Perks setPerk={setPerks} selectedPerks={perks} />
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
                type="text"
                placeholder="14:00"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </CheckinItem>
            <CheckinItem>
              <CheckinSubtitle>Check-Out Time</CheckinSubtitle>
              <Input
                type="text"
                placeholder="11:00"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </CheckinItem>
            <CheckinItem>
              <CheckinSubtitle>Max Guest</CheckinSubtitle>
              <Input
                type="number"
                placeholder="12"
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
              />
            </CheckinItem>
          </CheckinGrid>
        </InputContainer>
        <PhotosForm
          photoUrl={photoLink}
          setPhotoUrl={setPhotoLink}
          handleAddPhotoUrl={handleLinkPhotoUpload}
          handleBulkPhotoHandler={handleBulkPhotoUpload}
          selectedBulkPhotos={addedPhotos}
        />
        <ButtonContainer>
          <SubmitButton type="submit">Save</SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default NewPlaceForm;
