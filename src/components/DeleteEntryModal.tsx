import React from 'react';

interface DeleteEntryModaProps {
    id?: string
}

export default function DeleteEntryModal({ id }: DeleteEntryModaProps) {
    return (
        <div>Successfully deleted {id}</div>
    )
}