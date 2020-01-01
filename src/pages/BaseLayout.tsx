import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <header>
        <Link to="/workspace/">Di</Link>
      </header>
      {children}
    </div>
  )
}

export default BaseLayout;
