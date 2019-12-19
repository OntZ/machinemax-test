import React from 'react';
import './App.scss';
import { MachinesList } from './pages/MachinesList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MachineDetails } from './pages/MachineDetails';

export const App: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MachinesList />
            )}
          />
          <Route
            exact
            path="/:machineID"
            render={() => (
              <MachineDetails />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
