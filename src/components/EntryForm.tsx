import React from 'react';
import styled from '@emotion/styled';
import { useForm, useField } from 'react-final-form-hooks'

import noop from '../utils/noop';

interface FormValues {
  text: string;
}

interface EntryFormProps {
  initialValues?: FormValues
  onChange?: (field: string, value: string) => void;
  onSubmit?: (arg0: FormValues) => void;
}

const Textarea = styled.textarea`
  height: 100%;
  width: 100%;
`;

export default function EntryForm({ initialValues, onChange, onSubmit }: EntryFormProps) {
  const { form, pristine, handleSubmit } = useForm({
    onSubmit: onSubmit || noop,
    initialValues,
  });

  const textField = useField('text', form);

  function handleChangeTextField(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange) onChange(event.target.name, event.target.value);
    textField.input.onChange(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        rows={10}
        name={textField.input.name}
        value={textField.input.value}
        onBlur={textField.input.onBlur}
        onFocus={textField.input.onFocus}
        onChange={handleChangeTextField}
      />
      <button type="submit" disabled={pristine}>save</button>
    </form>
  );
}
