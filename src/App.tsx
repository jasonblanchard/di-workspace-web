import React from 'react';
import { jsx, ThemeProvider } from '@emotion/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';
import { RecoilRoot } from 'recoil';

import themes from './themes'
import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';
import InsightsPage from './pages/InsightsPage';
import EntryEditorExperienceConnector from './experiences/EntryEditorExperienceConnector';
import EntryListExperienceConnector from './experiences/EntryListExperienceConnector';
import VelocityOverviewExperienceConnector from './experiences/VelocityOverviewExperienceConnector';
import SearchPage from './search/SearchPage';
import Toast from './toast';

const WorkspacePageConnectors = {
  EntryListExperienceConnector,
}

const EntryEditorPageConnectors = {
  EntryEditorExperienceConnector,
  EntryListExperienceConnector,
}

const InsightsPageConnectors = {
  VelocityOverviewExperienceConnector
}

export default function App() {
  return (
    <ThemeProvider theme={themes.light}>
      <RecoilRoot>
        <Toast />
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Switch>
              <Route path="/workspace" exact>
                <WorkspacePage connectors={WorkspacePageConnectors} />
              </Route>
              <Route path="/workspace/:entryId" exact>
                <EntryEditorPage connectors={EntryEditorPageConnectors} />
              </Route>
              <Route path="/insights" exact>
                <InsightsPage connectors={InsightsPageConnectors} />
              </Route>
              <Route path="/search" exact>
                <SearchPage />
              </Route>
            </Switch>
          </QueryParamProvider>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}
