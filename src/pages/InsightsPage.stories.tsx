import React from 'react';

import InsightsPage from './InsightsPage';
import { VelocityOverviewExperienceConnector } from '../experiences/connectors';

export default { title: 'InsightsPage' };

interface Connectors {
  VelocityOverviewExperienceConnector: VelocityOverviewExperienceConnector,
}

const velocities = [
  [
    {
      "day": new Date("2020-07-05T00:00:00.000Z"),
      "score": 1
    },
    {
      "day": new Date("2020-07-06T00:00:00.000Z"),
      "score": 2
    },
    {
      "day": new Date("2020-07-07T00:00:00.000Z"),
      "score": 3
    },
    {
      "day": new Date("2020-07-08T00:00:00.000Z"),
      "score": 4
    },
    {
      "day": new Date("2020-07-09T00:00:00.000Z"),
      "score": 5
    },
    {
      "day": new Date("2020-07-10T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-11T00:00:00.000Z"),
      "score": 0
    },
  ],
];

const connectors: Connectors = {
  VelocityOverviewExperienceConnector: ({ children }) => (children({
    velocities: velocities,
    isVelocityOverviewLoading: false,
  })),
}

export const base = () => {
  return (
    <InsightsPage connectors={connectors} />
  )
}
