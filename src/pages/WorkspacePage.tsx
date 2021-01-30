import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

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
  const history = useHistory();
  useHotkeys('command+shift+f', () => {
    history.push("/search/")
  })

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
