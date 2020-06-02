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

  // return (
  //   <connectors.EntryListExperienceConnector patches={entryPatches}>
  //     {({ isEntriesLoading, onClickNew, ...rest }) => {
  //       return (
  //         <SideDrawerLayout>
  //           <nav>
  //             {isEntriesLoading ? <div>loading...</div> : <EntryListExperience onClickNew={onClickNew} {...rest} />}
  //           </nav>
  //           <nav>
  //             <button onClick={onClickNew}>+</button>
  //           </nav>
  //           <div role="main">
  //             <connectors.EntryEditorExperienceConnector selectedEntryId={entryId} onChangeEntry={handleChangeEntry}>
  //               {({ isLoadingEntry, ...rest }) => {
  //                 return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience {...rest} />
  //               }}
  //             </connectors.EntryEditorExperienceConnector>
  //           </div>
  //         </SideDrawerLayout>
  //       )
  //     }}
  //   </connectors.EntryListExperienceConnector>
  // )
  return (
    <SideDrawerLayout>
      <connectors.EntryListExperienceConnector patches={entryPatches}>
        {({ isEntriesLoading, onClickNew, ...rest }) => {
          return (
          <nav>
            {isEntriesLoading ? <div>loading...</div> : <EntryListExperience onClickNew={onClickNew} {...rest} />}
          </nav>
          );
        }}
      </connectors.EntryListExperienceConnector>
      <nav>
        <button>+</button>
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
