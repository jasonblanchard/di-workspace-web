import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import EntryEditorPage from './pages/EntryEditorPage';
import WorkspacePage from './pages/WorkspacePage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/workspace" exact>
          <WorkspacePage />
        </Route>
        <Route path="/workspace/:entryId" exact>
          <EntryEditorPage />
        </Route>
      </Switch>
    </Router>
  );
}
