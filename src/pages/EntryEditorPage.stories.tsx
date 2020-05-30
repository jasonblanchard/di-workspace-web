import React from 'react';

import EntryEditorPage from './EntryEditorPage';
import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';
import noop from '../utils/noop';
import { EntryListExperienceConnector, EntryEditorExperienceConnector } from '../experiences/connectors';

export default { title: 'EntryEditorPage' };

interface Connectors {
  EntryEditorExperienceConnector: EntryEditorExperienceConnector,
  EntryListExperienceConnector: EntryListExperienceConnector;
}

const entries = Array.from(Array(55)).map((n, i) => ({
  id: String(i.toString(10)),
  preview: 'Fusce Vulputate Lorem Etiam'
}));

const connectors: Connectors = {
  EntryEditorExperienceConnector: ({ children }) => (children({
    saveStatusIndicatorVariant: SaveStatusIndicatorVariant.Saved,
    isLoadingEntry: false,
    isEntryFormDisabled: false,
    entryCreatedAt: '2020-05-30T13:14:21.885Z',
    onSubmitEntryForm: noop,
    onChangeEntryForm: noop,
    onClickConfirmDeleteEntry: noop,
  })),
  EntryListExperienceConnector: ({ children }) => (children({
    entries,
    isEntriesLoading: false,
    showNextButton: true,
    onClickNew: () => console.log('new'),
    onClickMore: noop,
  })),
}

export const base = () => {
  return (
    <EntryEditorPage connectors={connectors} />
  )
}
