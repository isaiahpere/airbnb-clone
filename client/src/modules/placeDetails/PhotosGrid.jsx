import React from "react";
import styled from "styled-components";
import useWindowDimensions from "../../utilities/hooks/useWindow";
import { TbGridDots } from "react-icons/tb";

import { Flex } from "../home";

const Container = styled.div`
  position: relative;
  display: none;
  grid-template-columns: 2fr 1fr 1fr;
  width: 100%;
  gap: 5px;
  overflow: hidden;
  @media (min-width: 768px) {
    display: grid;
    height: 500px;
  }
  @media (min-width: 1024px) {
    height: 540px;
  }
  @media (min-width: 1440px) {
    height: 540px;
  }
`;

const GridColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  gap: 5px;
  @media (min-width: 768px) {
    display: grid;
    height: 500px;
  }
  @media (min-width: 1024px) {
    height: 540px;
  }
  @media (min-width: 1440px) {
    height: 540px;
  }
`;

const GridItemFull = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px 0px 0px 24px;
  @media (min-width: 768px) {
    height: 500px;
  }
  @media (min-width: 1024px) {
    height: 540px;
  }
`;

const GridItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (min-width: 768px) {
    height: 250px;
  }
  @media (min-width: 1024px) {
    height: 270px;
  }
  ${(props) =>
    props.roundedTopRight &&
    `
      border-radius: 0px 24px 0px 0px;
  `}
  ${(props) =>
    props.roundedBottomRight &&
    `
      border-radius: 0px 0px 24px 0px;
  `}
`;

const SingleImageContainer = styled.div`
  display: block;
  grid-template-columns: 2fr 1fr 1fr;
  width: 100%;
  gap: 5px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
`;

const MoreImagesContainer = styled(Flex)`
  position: absolute;
  z-index: 10000;
  bottom: 20px;
  right: 10px;
  justify-content: flex-start;
  padding: 0px 10px;
  width: 160px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
`;

const ShowAllPhotosLink = styled.span`
  font-size: 12px;
  padding-left: 10px;
`;

const SquareDotIcon = styled(TbGridDots)`
  font-size: 18px;
`;

const PhotosGrid = ({ place, onChangeAllPhotos }) => {
  // useWindows
  const { width } = useWindowDimensions();
  let isAtLeastTablet = width && width >= 768;

  const handleShowAllPhotos = () => {
    onChangeAllPhotos(true);
  };

  if (!place.photos) return;
  return (
    <>
      {isAtLeastTablet && (
        <Container>
          <GridItemFull src={place.photos[0].url} />
          <GridColumnContainer>
            <GridItem src={place.photos[1].url} />
            <GridItem src={place.photos[2].url} />
          </GridColumnContainer>
          <GridColumnContainer>
            <GridItem roundedTopRight src={place.photos[3].url} />
            <GridItem roundedBottomRight src={place.photos[4].url} />
          </GridColumnContainer>
          <MoreImagesContainer onClick={handleShowAllPhotos}>
            <SquareDotIcon />
            <ShowAllPhotosLink>Show all photos</ShowAllPhotosLink>
          </MoreImagesContainer>
        </Container>
      )}
      {!isAtLeastTablet && (
        <SingleImageContainer>
          <MainImage onClick={handleShowAllPhotos} src={place.photos[0].url} />
        </SingleImageContainer>
      )}
    </>
  );
};

export default PhotosGrid;
