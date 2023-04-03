import React from "react";
import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section``;

const Home = () => {
  return (
    <Section>
      <div>Home Page</div>
    </Section>
  );
};

export default Home;
