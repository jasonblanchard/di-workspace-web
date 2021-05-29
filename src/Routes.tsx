import React, { useEffect } from 'react';
import {
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
import toastState from './toast/atom';

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
                        <WorkspacePage />
                    </Route>
                    <Route path="/workspace/:entryId" exact>
                        <EntryEditorPage />
                    </Route>
                    <Route path="/insights" exact>
                        <InsightsPage />
                    </Route>
                    <Route path="/search" exact>
                        <SearchPage />
                    </Route>
                </Switch>
            </QueryParamProvider>
        </>
    )
}