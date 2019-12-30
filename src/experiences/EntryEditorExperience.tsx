import React from 'react';

import EntryForm from '../components/EntryForm';
import SaveStatusIndicator, { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';

interface EntryEditorExperienceProps {
  entryFormInitialValues?: {
    text: string;
  },
  isEntryFormDisabled: boolean;
  saveStatusIndicatorVariant: SaveStatusIndicatorVariant;
  onSubmitEntryForm: (arg0: { text: string }) => void;
  onChangeEntryForm: (field: string, value: string) => void;
}

export default function EntryEditorExperience({ entryFormInitialValues, isEntryFormDisabled, saveStatusIndicatorVariant, onSubmitEntryForm, onChangeEntryForm }: EntryEditorExperienceProps) {
  return (
    <>
      <div>
        <SaveStatusIndicator variant={saveStatusIndicatorVariant} />
      </div>
      <EntryForm
        initialValues={entryFormInitialValues}
        onSubmit={onSubmitEntryForm}
        isDisabled={isEntryFormDisabled}
        onChange={onChangeEntryForm}
      />
    </>
  );
}
