import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import SideDrawerLayout from './SideDrawerLayout';
import EntryEditorExperience from '../experiences/EntryEditorExperience';
import EntryListExperience from '../experiences/EntryListExperience';
import { EntryListExperienceConnector, EntryEditorExperienceConnector } from '../experiences/connectors';

interface EntryPatch {
  [key: string]: {
    text: string
  }
}

interface EntryEditorPageProps {
  connectors: {
    EntryEditorExperienceConnector: EntryEditorExperienceConnector,
    EntryListExperienceConnector: EntryListExperienceConnector;
  }
}

export default function EntryEditorPage({ connectors }: EntryEditorPageProps) {
  const { entryId } = useParams();
  const [entryPatches, setEntryPatches] = useState<EntryPatch>();

  function handleChangeEntry(id: string, _field: string, value: string) {
    setEntryPatches((patches) => {
      return {
        ...patches,
        ...{
          [id]: {
            text: value
          }
        }
      }
    });
  }

  return (
    <SideDrawerLayout>
      <nav>
        <connectors.EntryListExperienceConnector patches={entryPatches}>
          {({ isEntriesLoading, ...rest }) => {
            return isEntriesLoading ? <div>loading...</div> : <EntryListExperience {...rest} />;
          }}
        </connectors.EntryListExperienceConnector>
      </nav>
      <nav>
        <connectors.EntryListExperienceConnector>
          {({ onClickNew }) => {
            return <button onClick={onClickNew}>+</button>;
          }}
        </connectors.EntryListExperienceConnector>
      </nav>
      <div role="main">
        <connectors.EntryEditorExperienceConnector selectedEntryId={entryId} onChangeEntry={handleChangeEntry}>
          {({ isLoadingEntry, ...rest }) => {
            return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience {...rest} />
          }}
        </connectors.EntryEditorExperienceConnector>
      </div>
    </SideDrawerLayout>
  )
}
