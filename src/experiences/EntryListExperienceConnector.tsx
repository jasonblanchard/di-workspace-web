import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { useHistory } from "react-router-dom";
import { NotebookClient } from "@jasonblanchard/di-apis"

import entryPreview from '../utils/entryPreview';
import getCsrfToken from '../utils/getCsrfToken';

const listQuery = `
  query($first: Int, $after: String) {
    entryList: entries(first: $first, after: $after) {
      edges {
        id
        text
      }
      pageInfo {
        hasNextPage
        endCursor
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

interface Patch {
  [key: string]: {
    text: string
  }
}

interface EntryListExperienceConnectorProps {
  children: (arg0: EntryListExperienceConnectorRenderProps) => React.ReactElement;
  patches?: Patch;
}

export interface EntryListExperienceConnectorRenderProps {
  entries: EntryPreview[];
  isEntriesLoading: boolean;
  onClickNew: () => void;
  onClickMore: () => void;
  showNextButton: boolean;
}


const baseUrl = '/api/graphql/';
const csrfToken = getCsrfToken();
const client = new GraphQLClient(baseUrl, {
  headers: {
    'CSRF-Token': csrfToken,
  }
});

const notebookClient = new NotebookClient(`${location.protocol}//${location.hostname}/notebook`)

export default function EntryListExperienceConnector({ children, patches }: EntryListExperienceConnectorProps) {
  const [entries, setEntries] = useState<EntryPreview[]>([]);
  const [isEntriesLoading, setIsEntriesLoaded] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState();
  const history = useHistory();

  useEffect(() => {
    async function fetchEntries() {
      setIsEntriesLoaded(true);
      // const { entryList } = await client.request(listQuery, {
      //   first: 50
      // });
      // const { edges, pageInfo } = entryList;
      const { body } = await notebookClient.Notebook_ListEntries({
        pageSize: 50,
      })

      setEntries(body.entries.map((entry: Entry) => ({
        id: entry.id,
        preview: entryPreview(entry.text)
      })));
      setHasNextPage(body.hasNextPage);
      setNextCursor(body.nextPageToken);
      setIsEntriesLoaded(false);
    }
    fetchEntries();
  }, []);

  async function onClickNew() {
    const { entry } = await client.request(createQuery, {
      text: '',
    });

    setEntries(entries => ([
      {
        id: entry.id,
        preview: entryPreview(''),
      },
      ...entries,
    ]));

    history.push(`/workspace/${entry.id}`)
  }

  async function onClickMore() {
    const { entryList } = await client.request(listQuery, {
      first: 10,
      after: nextCursor,
    });
    const { edges, pageInfo } = entryList;
    const nextEntries = edges.map((entry: Entry) => ({
      id: entry.id,
      preview: entryPreview(entry.text)
    }))
    setEntries(entries => [...entries, ...nextEntries]);
    setHasNextPage(pageInfo.hasNextPage); setNextCursor
    setNextCursor(pageInfo.endCursor);
  }

  const patchedEntries = entries.map((entry: EntryPreview) => {
    if (patches?.[entry.id]) {
      return { ...entry, preview: entryPreview(patches?.[entry.id]?.text) }
    }
    return entry;
  });

  return children({
    entries: patchedEntries,
    isEntriesLoading,
    onClickNew,
    onClickMore,
    showNextButton: hasNextPage,
  });
}
