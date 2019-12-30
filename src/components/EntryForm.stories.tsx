import React from 'react';

import EntryForm from './EntryForm';

export default { title: 'EntryForm' };

export const base = () => {
  return <EntryForm />
}

export const initialValues = () => {
  return <EntryForm initialValues={{text: 'Initialized entry\n\nadf sadf'}} />
}

function handleChange(field: string, value: string) {
  console.log(`${field}: ${value}`);
}

function handleSubmit(fields: string) {
  console.log(fields);
}

export const lifeCycleHandlers = () => {
  return <EntryForm onChange={handleChange} onSubmit={handleSubmit} />
}
