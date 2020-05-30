import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/core';

const styles = css`
  body {
    margin: 0;
  }

  #root, #app {
    height: 100%;
  }
`

const GlobalStyles: FunctionComponent = ({ children }) => {
  return (
    <Global styles={styles} />
  );
}

export default GlobalStyles;
