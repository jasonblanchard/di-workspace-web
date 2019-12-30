import React from 'react';

import SideDrawerLayout from './SideDrawerLayout';

export default { title: 'SideDrawerLayout' };

export const base = () => {
  return (
    <SideDrawerLayout>
      <nav>sidebar content</nav>
      <div role="main">main content</div>
    </SideDrawerLayout>
  )
}
