import React from 'react';

import { VelocityOverviewExperienceConnector } from '../connectors';
import BaseLayout from './BaseLayout';
import VelocityOverviewExperience from '../velocityOverview/VelocityOverviewExperience';

interface InsightsPageProps {
  connectors: {
    VelocityOverviewExperienceConnector: VelocityOverviewExperienceConnector,
  }
}

export default function InsightsPage({ connectors }: InsightsPageProps) {
  return (
    <BaseLayout>
      <h2>Insights</h2>
      <div>
        <h3>Velocity</h3>
        <connectors.VelocityOverviewExperienceConnector>
          {({ isVelocityOverviewLoading, velocities }) => {
            return (
              isVelocityOverviewLoading ? <div>"Loading..."</div> : <VelocityOverviewExperience velocities={velocities} />
            );
          }}
        </connectors.VelocityOverviewExperienceConnector>
      </div>
    </BaseLayout>
  );
}
