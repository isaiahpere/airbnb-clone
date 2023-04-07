import React from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";

import { Flex } from "../../../home";
import { ReviewContainer } from "../../PlaceHeader";
import { generateRandomNumber } from "../../../../utilities/helpers/helpers";
import Dot from "../../../../components/Dot";

const HeaderContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

const PriceContainer = styled(Flex)``;

const HeaderPrice = styled.div`
  font-size: 24px;
`;

const PriceText = styled.span`
  font-size: 16px;
  font-weight: 300;
  margin-left: 4px;
  padding-top: 2px;
  @media (min-width: 768px) {
    font-size: 12px;
    padding-top: 4px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const ReviewStar = styled(BsStarFill)`
  font-size: 12px;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const StarRateText = styled.span`
  font-size: 12px;
  padding-top: 2px;
  margin-left: 4px;
  @media (min-width: 1024px) {
    font-size: 16px;
    margin-left: 2px;
  }
`;

const ReviewUnderlineText = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 12px;
  font-weight: 500;
  color: #777;
  cursor: pointer;
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const HeaderContent = ({ price }) => {
  return (
    <HeaderContainer>
      <PriceContainer>
        <HeaderPrice>${Math.round(price)}</HeaderPrice>
        <PriceText>night</PriceText>
      </PriceContainer>
      <ReviewContainer>
        <ReviewStar />
        <StarRateText>5.0</StarRateText>
        <Dot />
        <ReviewUnderlineText>
          {`${generateRandomNumber() + 1} Reviews`}
        </ReviewUnderlineText>
      </ReviewContainer>
    </HeaderContainer>
  );
};

export default HeaderContent;
