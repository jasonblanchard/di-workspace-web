import React from 'react';

import SideDrawerLayout from './SideDrawerLayout';

export default { title: 'SideDrawerLayout' };

export const base = () => {
  return (
    <SideDrawerLayout isSidebarCollapsed={false} onToggleCollapse={() => { console.log('clicked')}}>
      <nav>sidebar content</nav>
      <div role="main">main content</div>
    </SideDrawerLayout>
  )
}

export const collapsed = () => {
  return (
    <SideDrawerLayout isSidebarCollapsed onToggleCollapse={() => { console.log('clicked')}}>
      <nav>sidebar content</nav>
      <div role="main">main content</div>
    </SideDrawerLayout>
  )
}
