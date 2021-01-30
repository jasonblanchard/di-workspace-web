import React, { useState } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import SideDrawerLayout from './SideDrawerLayout';
import EntryEditorExperience from '../experiences/EntryEditorExperience';
import EntryListExperience from '../experiences/EntryListExperience';
import { EntryListExperienceConnector, EntryEditorExperienceConnector } from '../experiences/connectors';
import useLocalStorage from '../utils/useLocalStorage'

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage<boolean>('SideDrawerLayout:isCollapsed', true);
  const history = useHistory();

  interface Params {
    entryId: string
  }

  const { entryId } = useParams<Params>();
  const [entryPatches, setEntryPatches] = useState<EntryPatch>();

  const handleToggleCollapse = () => setIsSidebarCollapsed((isSidebarCollapsed: boolean) => !isSidebarCollapsed);

  useHotkeys('command+\\', handleToggleCollapse, [isSidebarCollapsed])
  useHotkeys('command+shift+f', () => {
    history.push("/search/")
  })

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
    <SideDrawerLayout isSidebarCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleCollapse}>
      <connectors.EntryListExperienceConnector patches={entryPatches}>
        {({ isEntriesLoading, onClickNew, ...rest }) => {
          if (isSidebarCollapsed) {
            return (
              <nav>
                <button onClick={onClickNew}>+</button>
              </nav>
            )
          }

          return (
            <nav>
              {isEntriesLoading ? <div>loading...</div> : <EntryListExperience onClickNew={onClickNew} {...rest} />}
            </nav>
          );
        }}
      </connectors.EntryListExperienceConnector>
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
