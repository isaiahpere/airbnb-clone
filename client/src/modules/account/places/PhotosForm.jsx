import React from "react";
import styled from "styled-components/macro";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { Label, InputContainer, Input } from "./NewPlaceForm";

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
  width: 100%;
`;

const GridImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 24px;
`;

const PhotosForm = ({
  photoUrl,
  setPhotoUrl,
  addPhotoUrl,
  bulkPhotoHandler,
  selectedBulkPhotos,
}) => {
  // handle photo url upload
  const handlePhotUrl = (e) => {
    setPhotoUrl(e.target.value);
  };

  // handle bulk photo upload
  const handleBulkPhtos = (e) => {
    bulkPhotoHandler(e);
  };
  return (
    <InputContainer>
      <Label>Photos</Label>
      <LinkUploadContainer>
        <Input
          type="text"
          placeholder="Add using link"
          value={photoUrl}
          onChange={handlePhotUrl}
        />
        <LinkUploadButton onClick={addPhotoUrl}>Add Photo</LinkUploadButton>
      </LinkUploadContainer>
      <PhotosContainer>
        <UploadBox>
          <FileUploaderInput type="file" multiple onChange={handleBulkPhtos} />
          <BoxContentContainer>
            <UploadIcon />
            <UploadText>Upload</UploadText>
          </BoxContentContainer>
        </UploadBox>
        <GridContainer>
          {selectedBulkPhotos.length > 0 &&
            selectedBulkPhotos.map((item) => (
              <GridItem key={item}>
                <GridImage
                  src={`${process.env.REACT_APP_API_PHOTO_UPLOAD_URL}${item}`}
                />
              </GridItem>
            ))}
        </GridContainer>
      </PhotosContainer>
    </InputContainer>
  );
};

export default PhotosForm;
