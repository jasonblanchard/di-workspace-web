import React from 'react';
import { useParams } from 'react-router-dom';

import SideDrawerLayout from './SideDrawerLayout';
import EntryEditorExperience from '../experiences/EntryEditorExperience';
import EntryEditorExperienceConnector from '../experiences/EntryEditorExperienceConnector';

export default function EntryEditorPage() {
  const { entryId } = useParams();

  return (
    <SideDrawerLayout>
      <nav>
        TODO
      </nav>
      <div role="main">
        <EntryEditorExperienceConnector selectedEntryId={entryId}>
          {({ isLoadingEntry, ...rest }) => {
            return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience {...rest} />
          }}
        </EntryEditorExperienceConnector>
      </div>
    </SideDrawerLayout>
  )
}
