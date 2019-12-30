import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import EntryEditorPage from './pages/EntryEditorPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/workspace" exact>
          <div>list all the entries here</div>
        </Route>
        <Route path="/workspace/:entryId" exact>
          <EntryEditorPage />
        </Route>
      </Switch>
    </Router>
  );
}
