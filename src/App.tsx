import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';
import EntryEditorExperienceConnector from './experiences/EntryEditorExperienceConnector';
import EntryListExperienceConnector from './experiences/EntryListExperienceConnector';

const WorkspacePageConnectors = {
  EntryListExperienceConnector,
}

const EntryEditorPageConnectors = {
  EntryEditorExperienceConnector,
  EntryListExperienceConnector,
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/workspace" exact>
          <WorkspacePage connectors={WorkspacePageConnectors} />
        </Route>
        <Route path="/workspace/:entryId" exact>
          <EntryEditorPage connectors={EntryEditorPageConnectors} />
        </Route>
      </Switch>
    </Router>
  );
}
