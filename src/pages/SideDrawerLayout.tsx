import React, { Children, FunctionComponent } from 'react';
import styled from '@emotion/styled';

import BaseLayout from './BaseLayout';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-areas: "sidebar main";


  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas:
      "main"
      "sidebar";
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  height: 100vh;
  overflow: scroll;
  padding: 10px;
`;

const Main = styled.div`
  grid-area: main;
  padding: 10px;
`;

const SideDrawerLayout: FunctionComponent = ({ children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <BaseLayout>
      <Container>
        <Sidebar>
          {childrenArray[0]}
        </Sidebar>
        <Main>
          {childrenArray[1]}
        </Main>
      </Container>
    </BaseLayout>
  )
}

export default SideDrawerLayout;
