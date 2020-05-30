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
    entries: [
      {
        id: '1',
        preview: 'Consectetur Commodo Amet'
      },
      {
        id: '2',
        preview: 'Fusce Vulputate Lorem Etiam'
      }
    ],
    isEntriesLoading: false,
    showNextButton: true,
    onClickNew: noop,
    onClickMore: noop,
  })),
}

export const base = () => {
  return (
    <EntryEditorPage connectors={connectors} />
  )
}
