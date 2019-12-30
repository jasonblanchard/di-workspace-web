import React from 'react';

import EntryEditorExperience from './EntryEditorExperience';
import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';
import EntryEditorExperienceConnector from './EntryEditorExperienceConnector';

export default { title: 'EntryEditorExperience' };

function saveEntry({ text }: { text: string}) {
  console.log(`Call update with ${text}`);
}

function handleChangeEntryForm(field: string, value: string) {
  console.log(`Updating ${field} to ${value}`);
}

export const base = () => {
  return (
    <EntryEditorExperience
      isEntryFormDisabled={false}
      saveStatusIndicatorVariant={SaveStatusIndicatorVariant.Saved}
      onSubmitEntryForm={saveEntry}
      onChangeEntryForm={handleChangeEntryForm}
    />
  )
}

// export const connected = () => {
//   return (
//     <EntryEditorExperienceConnector selectedEntryId={'141'}>
//       {({isLoadingEntry, ...rest}) => {
//         return isLoadingEntry ? <div>loading...</div> : <EntryEditorExperience {...rest} />
//       }}
//     </EntryEditorExperienceConnector>
//   );
// }
