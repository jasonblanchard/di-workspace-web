import React from 'react'
import styled from '@emotion/styled';
import { useForm, useField } from 'react-final-form-hooks'

import SearchPreview from './SearchPreview';

const Container = styled.div`
    margin: 10px;
`;

interface Entry {
    id: string
    text: string
}

interface SearchExperienceProps {
    entries?: Entry[]
    onClickMore: () => void
}

export default function SearchExperience({ entries, onClickMore }: SearchExperienceProps) {
    const { form } = useForm({
        onSubmit: () => {}
    });

    const queryField = useField('query', form);

    let results: Entry[] = [];
    if (entries && queryField.input.value) {
        results = entries.filter((entry: Entry) => entry.text.toLocaleLowerCase().includes(queryField.input.value.toLocaleLowerCase()))
    }

    return (
        <Container>
            <input
                name={queryField.input.name}
                value={queryField.input.value}
                onChange={queryField.input.onChange}
                placeholder="search"
            />
            {results.map((entry: Entry) => <div key={entry.id}><SearchPreview query={queryField.input.value} text={entry.text} id={entry.id} /></div>)}
            <button onClick={onClickMore}>search more</button>
        </Container>
    )
}