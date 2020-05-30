import React from 'react';

import BaseLayout from './BaseLayout';
import EntryListExperience from '../experiences/EntryListExperience';
import { EntryListExperienceConnector } from '../experiences/connectors';

interface WorkspacePageProps {
  connectors: {
    EntryListExperienceConnector: EntryListExperienceConnector;
  }
}

export default function WorkspacePage({ connectors }: WorkspacePageProps) {
  return (
    <BaseLayout>
      <connectors.EntryListExperienceConnector>
        {({ isEntriesLoading, ...rest }) => {
          return isEntriesLoading ? <div>loading...</div> : <EntryListExperience {...rest} />;
        }}
      </connectors.EntryListExperienceConnector>
    </BaseLayout>
  )
}
