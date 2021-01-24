import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import GlobalStyles from './GlobalStyles';

const Container = styled.div`
  height: 100%;
`;

const Header = styled.header`
  padding: 10px;
`

const StyledLink = styled(Link)`
  font-family: Playfair Display, serif;
  font-size: 2.5rem;
`

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Container className="BaseLayout">
        <Header>
          <StyledLink to="/workspace/">Di</StyledLink>
        </Header>
        {children}
      </Container>
    </>
  )
}

export default BaseLayout;
