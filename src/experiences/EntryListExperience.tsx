import React from 'react';

import EntryList from '../components/EntriesList';

interface Entry {
  id: string;
  preview: string;
}

interface EntryListExperienceProps {
  entries: Entry[];
  onClickNew: () => void;
}

export default function EntryListExperience({ entries, onClickNew }: EntryListExperienceProps) {
  return (
    <>
      <button onClick={onClickNew}>new</button>
      <EntryList entries={entries} />
    </>
  );
}
