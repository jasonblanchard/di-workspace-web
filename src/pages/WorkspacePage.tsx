import React from 'react';

import BaseLayout from './BaseLayout';
import EntryListExperience from '../experiences/EntryListExperience';
import EntryListExperienceConnector from '../experiences/EntryListExperienceConnector';

export default function WorkspacePage() {
  return (
    <BaseLayout>
      <EntryListExperienceConnector>
        {({ isEntriesLoading, ...rest }) => {
          return isEntriesLoading ? <div>loading...</div> : <EntryListExperience {...rest} />;
        }}
      </EntryListExperienceConnector>
    </BaseLayout>
  )
}
