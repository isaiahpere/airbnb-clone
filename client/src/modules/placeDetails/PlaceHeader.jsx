import React from "react";
import styled from "styled-components/macro";
import { GiRibbonMedal } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";
import { RxShare2 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";

import Dot from "../../components/Dot";
import { Flex } from "../home";
import { generateRandomNumber } from "../../utilities/helpers/helpers";

const Container = styled.div`
  display: none;
  width: 100%;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    display: block;
  }
`;

const PlaceTitle = styled.div`
  font-size: 40px;
  letter-spacing: 0.4px;
  font-weight: 500;
`;

const PlaceInfoLinkContainer = styled(Flex)`
  justify-content: space-between;
`;

const ReviewContainer = styled(Flex)`
  justify-content: flex-start;
`;

export const StartReview = styled(BsStarFill)`
  font-size: 16px;
`;

export const StarText = styled.span`
  font-size: 16px;
  padding-top: 2px;
  margin-left: 4px;
`;

export const UnderlineText = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const SuperHostIcon = styled(GiRibbonMedal)`
  font-size: 16px;
  margin-right: 4px;
`;

const SuperHostText = styled.span`
  font-size: 16px;
  font-weight: 300;
`;

const ShareLikeContainer = styled(Flex)``;

const ShareIcon = styled(RxShare2)`
  font-size: 20px;
  margin-right: 8px;
`;

const ShareText = styled(UnderlineText)`
  margin-right: 20px;
`;

const HeartIcon = styled(AiOutlineHeart)`
  font-size: 20px;
  margin-right: 8px;
`;

const PlaceHeader = ({ place }) => {
  let reviewCount = generateRandomNumber();

  return (
    <Container>
      <PlaceTitle>{place.title}</PlaceTitle>
      <PlaceInfoLinkContainer>
        <ReviewContainer>
          <StartReview />
          <StarText>5.0</StarText>
          <Dot />
          <UnderlineText>{reviewCount} Reviews</UnderlineText>
          <Dot />
          <SuperHostIcon />
          <SuperHostText>Superhost</SuperHostText>
          <Dot />
          <UnderlineText>
            <a
              href={`https://www.google.com/maps/place/${place.city},+${place.state}`}
              target="_blank"
              rel="noreferrer"
            >{`${place.city}, ${place.state}`}</a>
          </UnderlineText>
        </ReviewContainer>
        <ShareLikeContainer>
          <ShareIcon />
          <ShareText>Share</ShareText>
          <HeartIcon />
          <UnderlineText>Save</UnderlineText>
        </ShareLikeContainer>
      </PlaceInfoLinkContainer>
    </Container>
  );
};

export default PlaceHeader;
