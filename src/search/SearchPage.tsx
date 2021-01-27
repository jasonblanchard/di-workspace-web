import React from 'react'

import BaseLayout from '../pages/BaseLayout'
import SearchExperience from './SearchExperience';
import SearchExperienceConnector from './SearchExperienceConnector';

export default function SearchPage() {
    return (
        <BaseLayout>
            <SearchExperienceConnector>
                {({ entries, onClickMore }) => (
                    <SearchExperience entries={entries} onClickMore={onClickMore} />
                )}
            </SearchExperienceConnector>
        </BaseLayout>
    )
}