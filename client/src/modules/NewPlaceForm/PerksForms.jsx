import React from "react";
import styled from "styled-components/macro";
import {
  AiOutlineWifi,
  AiOutlineCar,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { MdOutlinePets, MdRadio } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";

import { InputContainer, Label, Input } from ".";

const PERKS = ["Wifi", "Parking", "Kitchen", "Pets", "Security", "Radio"];

const PerksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 8px 0px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PerkItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border: solid 1px #dddddd;
  border-radius: 12px;
  gap: 6px;
  cursor: pointer;
`;

const Wifi = styled(AiOutlineWifi)``;
const Parking = styled(AiOutlineCar)``;
const Security = styled(AiOutlineVideoCamera)``;
const Pets = styled(MdOutlinePets)``;
const Radio = styled(MdRadio)``;
const Kitchen = styled(TbToolsKitchen2)``;

const PerkTitle = styled.span``;

const PerksForms = ({ selectedPerks, setPerk }) => {
  const PerkIcons = {
    Wifi: <Wifi />,
    Parking: <Parking />,
    Kitchen: <Kitchen />,
    Radio: <Radio />,
    Security: <Security />,
    Pets: <Pets />,
  };

  const renderIcon = (type) => {
    let icon = null;
    for (const [key, value] of Object.entries(PerkIcons)) {
      if (key === type) {
        icon = value;
      }
    }
    return icon;
  };

  // toggle the perks in the array
  const handlePerkChange = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setPerk((prev) => [...prev, name]);
    } else {
      setPerk((selectedPerks) => selectedPerks.filter((item) => item !== name));
    }
  };

  return (
    <InputContainer>
      <Label>Perks</Label>
      <PerksContainer>
        {PERKS.map((perk) => (
          <PerkItem key={perk}>
            <Input
              type="checkbox"
              name={perk}
              value={perk}
              checked={!!selectedPerks.includes(perk)}
              onChange={handlePerkChange}
            />
            {renderIcon(perk)}
            <PerkTitle>{perk}</PerkTitle>
          </PerkItem>
        ))}
      </PerksContainer>
    </InputContainer>
  );
};

export default PerksForms;
