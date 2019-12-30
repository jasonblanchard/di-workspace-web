import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

interface Entry {
  id: string;
  preview: string;
}

interface EntriesListProps {
  entries: Entry[];
}

interface EntryListItemProps {
  entry: Entry
}

function EntryListItem({ entry }: EntryListItemProps) {
  return (
    <li>
      <Link to={`/workspace/${entry.id}`}>{entry.preview}</Link>
    </li>
  );
}

export default function EntriesList({ entries }: EntriesListProps) {
  return (
    <Ul>
      {entries.map(entry => <EntryListItem key={entry.id} entry={entry} />)}
    </Ul>
  );
}
