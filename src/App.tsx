import React, { useState } from 'react';
import './App.scss';
import { MachinesList } from './pages/MachinesList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MachineDetails } from './pages/MachineDetails';

export const AppModeContext = React.createContext(false);

export const App: React.FC = () => {

  const [isNightMode, setNightMode] = useState(localStorage.getItem('night-mode') === 'true');

  return (
    <AppModeContext.Provider value={isNightMode}>
      <div className={`app${isNightMode ? ' app--night-mode' : ''}`}>
          <div className="content-area app__mode-container">
            <div className="col-lg-12 text-right">
              <label htmlFor="nightmode" className="app__mode-selector text-left">
                <span>Night mode:</span>
                <input
                  id="nightmode"
                  type="checkbox"
                  value="night"
                  checked={isNightMode}
                  onChange={e => {
                    const newMode = e.currentTarget.checked;
                    setNightMode(newMode);
                    localStorage.setItem('night-mode', '' + newMode)
                  }} />
                <div className="app__mode-selector__trigger"></div>
              </label>
            </div>
        </div>
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
    </AppModeContext.Provider>
  );
}
