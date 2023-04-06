import React from "react";
import styled from "styled-components";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";

import { Flex } from "../../home";
import { SuperHostIcon } from "../PlaceHeader";

const highlightData = [
  {
    icon: "superhost",
    title: "Isaiah is a superhost",
    text: "Superhost are experienced, highly rated host who are committed to providing great stays for guest.",
  },
  {
    icon: "map",
    title: "Great Location",
    text: "100% of recent guests gave the location a 5-star rating.",
  },
  {
    icon: "calendar",
    title: "Free cancellation before May 24.",
  },
];

const HightlightsContainer = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`;

const HighlightIconSuperhost = styled(SuperHostIcon)`
  font-size: 24px;
  margin-right: 10px;
`;

const HighlightIconMap = styled(FiMapPin)`
  font-size: 24px;
  margin-right: 10px;
`;

const HighlightIconCalendar = styled(AiOutlineCalendar)`
  font-size: 24px;
  margin-right: 10px;
`;

const HighlightContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const HighlightHeader = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`;

const HighLightTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.8px;
`;

const HighlightText = styled.p`
  font-size: 14px;
  color: gray;
`;

const PlaceInfoLeftHighlights = () => {
  const renderIcon = (iconName) => {
    if (iconName === "superhost") return <HighlightIconSuperhost />;
    else if (iconName === "map") return <HighlightIconMap />;
    else return <HighlightIconCalendar />;
  };

  return (
    <HightlightsContainer>
      {highlightData.map((item) => (
        <HighlightContainer key={item.icon}>
          {renderIcon(item.icon)}
          <HighlightHeader>
            <HighLightTitle>{item.title}</HighLightTitle>
            {item.text && <HighlightText>{item.text}</HighlightText>}
          </HighlightHeader>
        </HighlightContainer>
      ))}
    </HightlightsContainer>
  );
};

export default PlaceInfoLeftHighlights;
