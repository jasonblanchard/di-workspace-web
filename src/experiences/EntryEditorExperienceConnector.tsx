import React, { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';
import { useHistory } from "react-router-dom";
import debounce from 'lodash.debounce';

import { Variant as SaveStatusIndicatorVariant } from '../components/SaveStatusIndicator';

interface EntryEditorExperienceConnectorRenderProps {
  isLoadingEntry: boolean;
  entryFormInitialValues?: {
    text: string;
  },
  isEntryFormDisabled: boolean;
  saveStatusIndicatorVariant: SaveStatusIndicatorVariant;
  onSubmitEntryForm: (arg0: { text: string }) => void;
  onChangeEntryForm: (field: string, value: string) => void;
  onClickConfirmDeleteEntry: () => void;
}

interface EntryEditorExperienceConnectorProps {
  children: (arg0: EntryEditorExperienceConnectorRenderProps) => React.ReactElement;
  selectedEntryId?: string;
}

interface Entry {
  text: string;
}

const getQuery = `
  query entry($id: String!) {
    entry(id: $id) {
      id
      text
    }
  }
`;

const updateQuery = `
  mutation updateEntry($id: String!, $text: String!) {
      entry: updateEntry(id: $id, text: $text) {
        id,
        text
      }
    }
`;

const deleteQuery = `
  mutation deleteEntry($id: String!) {
      deleteEntry(id: $id) {
        result
      }
    }
`;

const baseUrl = '/api/entry/';
const client = new GraphQLClient(baseUrl);

function mapSaveStateToSaveStatusIndicatorVariant(isSavingEntry: boolean, didSaveEntryFail: boolean) {
  if (didSaveEntryFail) return SaveStatusIndicatorVariant.Error;
  if (isSavingEntry) return SaveStatusIndicatorVariant.Saving;
  return SaveStatusIndicatorVariant.Saved;
}

export default function EntryEditorExperienceConnector({ children, selectedEntryId }: EntryEditorExperienceConnectorProps) {
  const [entry, setEntry] = useState<Entry>();
  const [isLoadingEntry, setIsLoadingEntry] = useState(false);
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [didSaveEntryFail, setDidSaveEntryFiled] = useState(false);
  const [debouncedSaveEntry, setDebouncedSaveEntry] = useState();

  const history = useHistory();

  useEffect(() => {
    async function fetchEntry() {
      if (!selectedEntryId) return;
      setIsLoadingEntry(true);
      const { entry } = await client.request(getQuery, { id: selectedEntryId });
      setEntry(entry);
      setIsLoadingEntry(false);
    }
    fetchEntry();
  }, [selectedEntryId]);

  async function saveEntry({ text }: { text: string }) {
    setDidSaveEntryFiled(false);
    setIsSavingEntry(true);
    try {
      await client.request(updateQuery, {
        id: selectedEntryId,
        text
      });
      setIsSavingEntry(false);
    } catch (error) {
      console.error(error);
      setIsSavingEntry(false);
      setDidSaveEntryFiled(true);
    }
  }

  // Only create the debounced save on first render.
  useEffect(() => {
    const debouncedSaveEntry = debounce(saveEntry, 1000, { maxWait: 5000 });
    // Need to use function syntax, otherwise the setter tries to immediately invoke it.
    setDebouncedSaveEntry(() => debouncedSaveEntry);
  }, [selectedEntryId]);

  async function deleteEntry() {
    await client.request(deleteQuery, { id: selectedEntryId });
    history.push(`/workspace`);
  }

  function handleChangeEntryForm(field: string, value: string) {
    // console.log(`Updating ${field} to ${value}`);
    if (!debouncedSaveEntry) return;
    if (field === 'text') debouncedSaveEntry({ text: value });
  }

  // TODO: Artificially slow down the transition from saving to saved to make it more noticeable.
  const saveStatusIndicatorVariant = mapSaveStateToSaveStatusIndicatorVariant(isSavingEntry, didSaveEntryFail);

  return children({
    isEntryFormDisabled: false,
    saveStatusIndicatorVariant,
    onSubmitEntryForm: saveEntry,
    onChangeEntryForm: handleChangeEntryForm,
    isLoadingEntry: isLoadingEntry,
    entryFormInitialValues: {
      text: entry?.text || ''
    },
    onClickConfirmDeleteEntry: deleteEntry,
  });
}
