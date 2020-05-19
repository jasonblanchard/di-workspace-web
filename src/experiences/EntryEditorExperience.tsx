import React from 'react';

import EntryForm from '../components/EntryForm';
import SaveStatusIndicator, { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';
import DeleteEntry from '../components/DeleteEntry';

interface EntryEditorExperienceProps {
  entryFormInitialValues?: {
    text: string;
  },
  isEntryFormDisabled: boolean;
  saveStatusIndicatorVariant: SaveStatusIndicatorVariant;
  onSubmitEntryForm: (arg0: { text: string }) => void;
  onChangeEntryForm: (field: string, value: string) => void;
  entryCreatedAt: string;
  entryUpdatedAt?: string;
  onClickConfirmDeleteEntry: () => void;
}

export default function EntryEditorExperience({ entryFormInitialValues, isEntryFormDisabled, saveStatusIndicatorVariant, onSubmitEntryForm, onChangeEntryForm, onClickConfirmDeleteEntry, entryCreatedAt, entryUpdatedAt }: EntryEditorExperienceProps) {
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
      <DeleteEntry onConfirmDelete={onClickConfirmDeleteEntry} />
      <div>
        {entryCreatedAt} {entryUpdatedAt ? `• ${entryUpdatedAt}` : null}
      </div>
    </>
  );
}
