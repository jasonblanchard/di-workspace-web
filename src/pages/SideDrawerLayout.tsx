import React, { useState, Children, FunctionComponent } from 'react';
import styled from '@emotion/styled';

import BaseLayout from './BaseLayout';

interface ContainerProps {
  isExpanded: boolean;
}

const Container = styled.div<ContainerProps>`
  height: 100%;
  display: grid;
  grid-template-columns: ${({ isExpanded }) => isExpanded ? '15% 85%' : '5% 95%'};
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

interface HideableProps {
  isHidden: boolean;
}

const Hideable = styled.div<HideableProps>`
  display: ${({ isHidden }) => isHidden ? 'none' : 'block'};
`;

const SideDrawerLayout: FunctionComponent = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const childrenArray = Children.toArray(children);

  const handleClickEspand = () => setIsExpanded(isExpanded => !isExpanded);

  return (
    <BaseLayout>
      <Container isExpanded={isExpanded}>
        <Sidebar>
          <button onClick={handleClickEspand}>{isExpanded ? "<<" : ">>"}</button>
          <Hideable isHidden={!isExpanded}>{childrenArray[0]}</Hideable>
          <Hideable isHidden={isExpanded}>{childrenArray[1]}</Hideable>
        </Sidebar>
        <Main>
          {childrenArray[2]}
        </Main>
      </Container>
    </BaseLayout>
  )
}

export default SideDrawerLayout;
