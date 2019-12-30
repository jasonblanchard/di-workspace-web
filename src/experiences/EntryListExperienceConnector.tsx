import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

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
}

interface EntryListExperienceConnectorProps {
  children: (arg0: EntryEditorExperienceConnectorRenderProps) => React.ReactElement;
}

const baseUrl = '/api/entry/';
const client = new GraphQLClient(baseUrl);

export default function EntryListExperienceConnector({ children }: EntryListExperienceConnectorProps) {
  const [entries, setEntries] = useState<EntryPreview[]>([]);
  const [isEntriesLoading, setIsEntriesLoaded] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setIsEntriesLoaded(true);
      const { entries } = await client.request(listQuery, {
        first: 20
      });
      setEntries(entries.edges.reverse().map((entry: Entry) => ({
        id: entry.id,
        preview: entryPreview(entry.text)
      })));
      setIsEntriesLoaded(false);
    }
    fetchEntries();
  }, []);

  return children({
    entries,
    isEntriesLoading,
  });
}
