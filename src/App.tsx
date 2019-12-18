import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getMachines } from './store/machines/machinesActions';
import { IApplicationState } from './store/rootReducer';
import { Machine } from './services/MachineService';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const App: React.FC = () => {
  const machines: Machine[] = useSelector((state: IApplicationState) => state.machines.machines);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  useEffect(() => {
    dispatch(getMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <pre>{JSON.stringify(machines, null, 4)}</pre>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
