import React from "react";
import styled from "styled-components/macro";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

import { Label, InputContainer } from ".";
import { Flex } from "../home";

const PhotosContainer = styled.div``;

const UploadBoxContainer = styled.div``;

const UploadBox = styled.label`
  position: relative;
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
  ${(props) =>
    props.error &&
    `
    border: solid 1px #ff385c;
  `}

  &:hover {
    background-color: #dddddd;
  }
`;

const UploadBoxError = styled.div`
  color: red;
  font-size: 12px;
  font-weight: 400;
  display: none;
  ${(props) =>
    props.error &&
    `
    display: block;
  `}
`;

const BoxContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 18px;
`;

const FileUploaderInput = styled.input`
  visibility: hidden;
`;

const UploadIcon = styled(AiOutlineCloudUpload)`
  font-size: 20px;
  margin-right: 4px;
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

  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const GridItem = styled.div`
  position: relative;
  width: 100%;
`;

const GridImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 24px;
`;

const TrashContainer = styled(Flex)`
  position: absolute;
  bottom: 15px;
  right: 10px;
  padding: 6px;
  border-radius: 24px;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const TrashCan = styled(FaRegTrashAlt)`
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #989696;
  }
`;
const PrimaryPhotoContainer = styled(Flex)`
  position: absolute;
  /* visibility: hidden; */
  background-color: transparent;
  ${(props) =>
    props.primary &&
    `
    background-color: rgba(255, 56, 91, 0.8);
  `}
  top: 15px;
  left: 10px;
  padding: 2px 4px;
  border-radius: 24px;
  z-index: 100000;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 56, 91, 0.8);
  }
`;

const PrimaryPhoto = styled.div`
  color: transparent;
  ${(props) =>
    props.primary &&
    `
    color: #fff;
  `}
  font-size: 10px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const PhotosForms = ({
  handleBulkPhotoHandler,
  handleAddedPhotos,
  selectedBulkPhotos,
  photoUploadError,
}) => {
  let primaryPhoto = selectedBulkPhotos[0];

  // handle bulk photo upload
  const handleBulkPhtos = (e) => {
    handleBulkPhotoHandler(e);
  };

  // remove photo from addedPhotos
  const handleRemovePhoto = (photo) => {
    handleAddedPhotos((prev) => prev.filter((item) => item !== photo));
  };

  // moves the photo to the beginning of the addedPhotos to make it primary
  const handlePrimaryPhotoChange = (photo) => {
    console.log("changing primary");
    handleAddedPhotos((prev) => [
      photo,
      ...prev.filter((item) => item !== photo),
    ]);
  };
  return (
    <InputContainer>
      <Label>Photos</Label>
      <PhotosContainer>
        <UploadBoxContainer>
          <UploadBox error={photoUploadError}>
            <FileUploaderInput
              type="file"
              multiple
              onChange={handleBulkPhtos}
            />
            <BoxContentContainer>
              <UploadIcon />
              <UploadText>Upload</UploadText>
            </BoxContentContainer>
          </UploadBox>
          <UploadBoxError error={photoUploadError}>
            * Minimum requirement of 6 photos
          </UploadBoxError>
        </UploadBoxContainer>
        <GridContainer>
          {selectedBulkPhotos.length > 0 &&
            selectedBulkPhotos.map((item) => (
              <GridItem key={item.url}>
                <GridImage src={item.url} />
                <TrashContainer>
                  <TrashCan onClick={() => handleRemovePhoto(item)} />
                </TrashContainer>
                <PrimaryPhotoContainer
                  primary={item === primaryPhoto}
                  onClick={() => handlePrimaryPhotoChange(item)}
                >
                  <PrimaryPhoto primary={item === primaryPhoto}>
                    Primary
                  </PrimaryPhoto>
                </PrimaryPhotoContainer>
              </GridItem>
            ))}
        </GridContainer>
      </PhotosContainer>
    </InputContainer>
  );
};

export default PhotosForms;
