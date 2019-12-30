import React from 'react';

import EntryEditorExperience from './EntryEditorExperience';
import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';

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
