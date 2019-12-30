import React, { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

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

const baseUrl = '/api/entry/';
const client = new GraphQLClient(baseUrl);

function handleChangeEntryForm(field: string, value: string) {
  console.log(`Updating ${field} to ${value}`);
}

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

  const saveStatusIndicatorVariant = mapSaveStateToSaveStatusIndicatorVariant(isSavingEntry, didSaveEntryFail);

  return children({
    isEntryFormDisabled: false,
    saveStatusIndicatorVariant,
    onSubmitEntryForm: saveEntry,
    onChangeEntryForm: handleChangeEntryForm,
    isLoadingEntry: isLoadingEntry,
    entryFormInitialValues: {
      text: entry?.text || ''
    }
  });
}
