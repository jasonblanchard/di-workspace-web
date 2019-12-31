import React, { useState } from 'react';

interface DeleteEntryProps {
  onConfirmDelete: () => void;
}

export default function DeleteEntry({ onConfirmDelete }: DeleteEntryProps) {
  const [isDeleteSelected, setIsDeleteSelected] = useState(false);

  if (isDeleteSelected) {
    return (
      <>
        <div>Are you sure?</div>
        <button onClick={onConfirmDelete}>yep</button>
        <button onClick={() => setIsDeleteSelected(false)}>nope</button>
      </>
    )
  }

  return (
    <button onClick={() => setIsDeleteSelected(true)}>delete</button>
  );
}
