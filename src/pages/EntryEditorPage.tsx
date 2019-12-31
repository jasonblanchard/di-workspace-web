import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import SideDrawerLayout from './SideDrawerLayout';
import EntryEditorExperience from '../experiences/EntryEditorExperience';
import EntryEditorExperienceConnector from '../experiences/EntryEditorExperienceConnector';
import EntryListExperience from '../experiences/EntryListExperience';
import EntryListExperienceConnector from '../experiences/EntryListExperienceConnector';

interface EntryPatch {
  [key: string]: {
    text: string
  }
}

export default function EntryEditorPage() {
  const { entryId } = useParams();
  const [entryPatches, setEntryPatches] = useState<EntryPatch>();

  function handleChangeEntry(id: string, field: string, value: string) {
    setEntryPatches((patches) => {
      return {
        ...patches,
        ...{
          [id]: {
            [field]: value
          }
        }
      }
    });
  }

  return (
    <SideDrawerLayout>
      <nav>
        <EntryListExperienceConnector patches={entryPatches}>
          {({ isEntriesLoading, ...rest }) => {
            return isEntriesLoading ? <div>loading...</div> : <EntryListExperience {...rest} />;
          }}
        </EntryListExperienceConnector>
      </nav>
      <div role="main">
        <EntryEditorExperienceConnector selectedEntryId={entryId} onChangeEntry={handleChangeEntry}>
          {({ isLoadingEntry, ...rest }) => {
            return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience {...rest} />
          }}
        </EntryEditorExperienceConnector>
      </div>
    </SideDrawerLayout>
  )
}
