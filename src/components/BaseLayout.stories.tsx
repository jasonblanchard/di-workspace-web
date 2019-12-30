import React from 'react';

import BaseLayout from './BaseLayout';

export default { title: 'BaseLayout' };

export const base = () => {
  return (
    <BaseLayout>
      <div role="main">main content</div>
    </BaseLayout>
  )
}
