import React, { useState } from "react";
import styled from "styled-components/macro";
import { AiOutlineCloudUpload } from "react-icons/ai";

import Perks from "./Perks";
import axios from "axios";

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

const LinkUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 14px;
`;

const LinkUploadButton = styled.button`
  width: 100px;
  border: none;
  background-color: #b7b7b7;
  height: 30px;
  border-radius: 24px;
  height: 40px;
  color: #242424;
  cursor: pointer;
`;

const PhotosContainer = styled.div``;

const UploadBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: solid 1px #dddddd;
  background-color: transparent;
  width: 160px;
  height: 60px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s ease;
  overflow: hidden;

  &:hover {
    background-color: #dddddd;
  }
`;

const BoxContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const FileUploaderInput = styled.input`
  visibility: hidden;
`;

const UploadIcon = styled(AiOutlineCloudUpload)`
  font-size: 18px;
  color: #242424;
`;

const UploadText = styled.div`
  font-size: 16px;
  color: #242424;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GridItem = styled.div`
  width: 100%;
`;

const GridImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.div`
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

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    console.log("ready to add photo link");
    if (photoLink) {
      const { data: fileName } = await axios.post("/link-uploads", {
        link: photoLink,
      });
      setAddedPhotos((prev) => [...prev, fileName]);
    }
    // reset
    setPhotoLink("");
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    // get files
    let files = e.target.files;

    // form multipart data
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
      console.log(files[i]);
    }

    console.log("data");
    console.log(data);

    // send files to backend to upload
    const { data: fileName } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // add photos to state
    setAddedPhotos((prev) => [...prev, fileName]);
  };

  console.log("addedPhotos");
  console.log(addedPhotos);
  return (
    <Container>
      <Form>
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
        <InputContainer>
          <Label>Photos</Label>
          <LinkUploadContainer>
            <Input
              type="text"
              placeholder="Add using link"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <LinkUploadButton onClick={addPhotoByLink}>
              Add Photo
            </LinkUploadButton>
          </LinkUploadContainer>
          <PhotosContainer>
            <UploadBox>
              <FileUploaderInput
                type="file"
                multiple
                onChange={handlePhotoUpload}
              />
              <BoxContentContainer>
                <UploadIcon />
                <UploadText>Upload</UploadText>
              </BoxContentContainer>
            </UploadBox>
            <GridContainer>
              {addedPhotos.length > 0 &&
                addedPhotos.map((item) => (
                  <GridItem>
                    <GridImage
                      src={`${process.env.REACT_APP_API_PHOTO_UPLOAD_URL}${item}`}
                    />
                  </GridItem>
                ))}
            </GridContainer>
          </PhotosContainer>
        </InputContainer>
        <ButtonContainer>
          <SubmitButton>Save</SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default NewPlaceForm;
