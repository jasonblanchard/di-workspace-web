import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';
import { useRecoilState } from 'recoil';

import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';
import InsightsPage from './pages/InsightsPage';
import SearchPage from './search/SearchPage';
import EntryEditorExperienceConnector from './experiences/EntryEditorExperienceConnector';
import EntryListExperienceConnector from './experiences/EntryListExperienceConnector';
import VelocityOverviewExperienceConnector from './experiences/VelocityOverviewExperienceConnector';
import toastState from './toast/atom';

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

export default function Routes() {
  const location = useLocation();
const [_, setToastText] = useRecoilState(toastState)

  useEffect(() => {
    //   setToastText(null)
  }, [location]);

    return (
        <>
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
        </>
    )
}