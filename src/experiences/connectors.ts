import react from 'react';

import EntryListExperienceConnector from './EntryListExperienceConnector';
import EntryEditorExperienceConnector from '../experiences/EntryEditorExperienceConnector';

export type EntryListExperienceConnector = (arg0: React.ComponentProps<typeof EntryListExperienceConnector>) => React.ReactElement;
export type EntryEditorExperienceConnector = (arg0: React.ComponentProps<typeof EntryEditorExperienceConnector>) => React.ReactElement;
