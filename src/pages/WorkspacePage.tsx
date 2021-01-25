import React from 'react';
import styled from '@emotion/styled';

import BaseLayout from './BaseLayout';
import EntryListExperience from '../experiences/EntryListExperience';
import { EntryListExperienceConnector } from '../experiences/connectors';

interface WorkspacePageProps {
  connectors: {
    EntryListExperienceConnector: EntryListExperienceConnector;
  }
}

const ListContainer = styled.div`
  padding: 10px;
`;

export default function WorkspacePage({ connectors }: WorkspacePageProps) {
  return (
    <BaseLayout>
      <connectors.EntryListExperienceConnector>
        {({ isEntriesLoading, ...rest }) => {
          return isEntriesLoading ? <div>loading...</div> : <ListContainer><EntryListExperience {...rest} /></ListContainer>;
        }}
      </connectors.EntryListExperienceConnector>
    </BaseLayout>
  )
}
