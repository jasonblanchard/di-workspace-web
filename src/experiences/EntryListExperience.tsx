import React from 'react';

import EntryList from '../components/EntriesList';

interface Entry {
  id: string;
  preview: string;
}

interface EntryListExperienceProps {
  entries: Entry[];
}

export default function EntryListExperience({ entries }: EntryListExperienceProps) {
  return (
    <>
      <button>new</button>
      <EntryList entries={entries} />
    </>
  );
}
