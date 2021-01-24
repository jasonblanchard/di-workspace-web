import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const styles = css`
  // @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
  // @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    color: #333333;
  }

  #root, #app {
    height: 100%;
  }
  
  textarea, input {
    font-family: 'Raleway', sans-serif;
  }

  a {
    text-decoration: none;
    color: #333333;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: 'Raleway',sans-serif
  }
`

const GlobalStyles: FunctionComponent = ({ children }) => {
  return (
    <Global styles={styles} />
  );
}

export default GlobalStyles;
