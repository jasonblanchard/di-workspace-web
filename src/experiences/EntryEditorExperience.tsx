import React from 'react';
import styled from '@emotion/styled';

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

const MetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const TimestampContainer = styled.div`
  color: ${props => props.theme.typography.colors.secondary};
`;

function formatDate(locale, dateTime?: string, ) {
  if (!dateTime) return '';
  const date = new Date(dateTime)
  const dateFormat = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
  })
  return dateFormat.format(date)
}


export default function EntryEditorExperience({ entryFormInitialValues, isEntryFormDisabled, saveStatusIndicatorVariant, onSubmitEntryForm, onChangeEntryForm, onClickConfirmDeleteEntry, entryCreatedAt, entryUpdatedAt }: EntryEditorExperienceProps) {
  return (
    <>
      <MetadataContainer>
        <div>
          <SaveStatusIndicator variant={saveStatusIndicatorVariant} />
        </div>
        <TimestampContainer>
          {formatDate('en-US', entryCreatedAt)} {entryUpdatedAt ? `• ${formatDate('en-US', entryUpdatedAt)}` : null}
        </TimestampContainer>
      </MetadataContainer>
      <EntryForm
        initialValues={entryFormInitialValues}
        onSubmit={onSubmitEntryForm}
        isDisabled={isEntryFormDisabled}
        onChange={onChangeEntryForm}
        actions={<DeleteEntry onConfirmDelete={onClickConfirmDeleteEntry} />}
      />
    </>
  );
}
