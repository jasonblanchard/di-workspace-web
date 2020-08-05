import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

import groupVelocityByWeek from '../utils/groupVelocityByWeek';
import getCsrfToken from '../utils/getCsrfToken';

const velocityOverviewQuery = `
  {
    velocityOverview {
      day
      score
    }
  }
`

interface VelocityOverviewExperienceConnectorProps {
  children: (arg0: VelocityOverviewConnectorRenderProps) => React.ReactElement;
}

interface Velocity {
  day: Date
  score: number
}

interface VelocityOverviewConnectorRenderProps {
  velocities: Velocity[][]
  isVelocityOverviewLoading: boolean
}

const baseUrl = '/api/entry/';
const csrfToken = getCsrfToken();
const client = new GraphQLClient(baseUrl, {
  headers: {
    'CSRF-Token': csrfToken,
  }
});

export default function VelocityOverviewExperienceConnector({ children }: VelocityOverviewExperienceConnectorProps) {
  const [velocities, setVelocities] = useState<Velocity[][]>([]);
  const [isVelocityOverviewLoading, setIsVelocityOverviewLoading] = useState(false);

  useEffect(() => {
    async function fetchVelocityOverview() {
      setIsVelocityOverviewLoading(true)
      const { velocityOverviewResponse } = await client.request(velocityOverviewQuery);

      setVelocities(groupVelocityByWeek(velocityOverviewResponse))
      setIsVelocityOverviewLoading(false)
    }

    fetchVelocityOverview();
  })

  return children({
    velocities,
    isVelocityOverviewLoading: isVelocityOverviewLoading,
  })
}