import React, { Children, FunctionComponent } from 'react';
import styled from '@emotion/styled';

import BaseLayout from './BaseLayout';

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
`;

const SideDrawerLayout: FunctionComponent = ({ children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <BaseLayout>
      <Container>
        <Sidebar>
          {childrenArray[0]}
        </Sidebar>
        <div>
          {childrenArray[1]}
        </div>
      </Container>
    </BaseLayout>
  )
}

export default SideDrawerLayout;
