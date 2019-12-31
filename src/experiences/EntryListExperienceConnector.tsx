import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { useHistory } from "react-router-dom";

import entryPreview from '../utils/entryPreview';

const listQuery = `
  query($first: Int) {
    entries(first: $first) {
      edges {
        id
        text
      }
    }
  }
`

const createQuery = `
  mutation createEntry($text: String!) {
      entry: createEntry(text: $text) {
        id
      }
    }
`;

interface EntryPreview {
  id: string;
  preview: string;
}

interface Entry {
  id: string;
  text: string;
}

interface EntryEditorExperienceConnectorRenderProps {
  entries: EntryPreview[];
  isEntriesLoading: boolean;
  onClickNew: () => void;
}

interface EntryListExperienceConnectorProps {
  children: (arg0: EntryEditorExperienceConnectorRenderProps) => React.ReactElement;
}

const baseUrl = '/api/entry/';
const client = new GraphQLClient(baseUrl);

export default function EntryListExperienceConnector({ children }: EntryListExperienceConnectorProps) {
  const [entries, setEntries] = useState<EntryPreview[]>([]);
  const [isEntriesLoading, setIsEntriesLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetchEntries() {
      setIsEntriesLoaded(true);
      const { entries } = await client.request(listQuery, {
        first: 10
      });
      setEntries(entries.edges.map((entry: Entry) => ({
        id: entry.id,
        preview: entryPreview(entry.text)
      })));
      setIsEntriesLoaded(false);
    }
    fetchEntries();
  }, []);

  async function onClickNew() {
    const { entry } = await client.request(createQuery, {
      text: '',
    });

    history.push(`/workspace/${entry.id}`)
  }

  return children({
    entries,
    isEntriesLoading,
    onClickNew,
  });
}
