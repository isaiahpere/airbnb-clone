import React from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { Flex } from "../home";

const Section = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50000;
  background-color: #fff;
  padding: 10px 20px;
  margin: 0;
  @media (min-width: 768px) {
    padding: 30px;
  }
  @media (min-width: 1200px) {
    max-width: 1300px;
    margin: 0 auto;
  }
`;

const HeaderContainer = styled(Flex)`
  justify-content: space-between;
  border-bottom: 1px solid #2222;
  margin-bottom: 20px;
`;

const BackButtonContainer = styled(Flex)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  @media (min-width: 1024px) {
  }
`;

const Title = styled.div`
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const ArrowIcon = styled(MdArrowBackIosNew)`
  font-size: 24px;
  padding-right: 2px;
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const PhotosContainer = styled.div``;

const PhotoImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const AllPhotos = ({ onTogglePhotosModal, photos }) => {
  const handleToggle = () => {
    onTogglePhotosModal(false);
  };

  if (!photos || photos.length < 1) onTogglePhotosModal(false);

  console.log(photos);

  return (
    <Section>
      <HeaderContainer>
        <BackButtonContainer onClick={handleToggle}>
          <ArrowIcon />
        </BackButtonContainer>
        <Title>All Photos</Title>
      </HeaderContainer>
      <PhotosContainer>
        {photos.map((photo) => (
          <PhotoImage
            key={photo}
            src={`${process.env.REACT_APP_API_PHOTO_UPLOAD_URL}${photo}`}
          />
        ))}
      </PhotosContainer>
    </Section>
  );
};

export default AllPhotos;
