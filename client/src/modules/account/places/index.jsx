import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import AddButton from "./AddButton";
import NewPlaceForm from "./NewPlaceForm";

const Section = styled.div``;

const Places = () => {
  const { action } = useParams();

  return (
    <Section>
      {action !== "new" && <AddButton />}
      {action === "new" && <NewPlaceForm />}
    </Section>
  );
};

export default Places;
