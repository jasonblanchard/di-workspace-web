import react from 'react';

import EntryListExperienceConnector from './entryList/EntryListExperienceConnector';
import EntryEditorExperienceConnector from './entryEditor/EntryEditorExperienceConnector';
import VelocityOverviewExperienceConnector from './velocityOverview/VelocityOverviewExperienceConnector';

export type EntryListExperienceConnector = (arg0: React.ComponentProps<typeof EntryListExperienceConnector>) => React.ReactElement;
export type EntryEditorExperienceConnector = (arg0: React.ComponentProps<typeof EntryEditorExperienceConnector>) => React.ReactElement;
export type VelocityOverviewExperienceConnector = (arg0: React.ComponentProps<typeof VelocityOverviewExperienceConnector>) => React.ReactElement;
