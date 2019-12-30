import React from 'react';

import EntryListExperience from './EntryListExperience';

export default { title: 'EntryListExperience' };

const entries = [
  {
    id: '1',
    preview: 'first'
  },
  {
    id: '1',
    preview: 'second'
  }
]

export const base = () => {
  return (
    <EntryListExperience entries={entries} />
  )
}
