import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { reduxWorks } from './store/app/actions';
import { IApplicationState } from './store/rootReducer';

const App: React.FC = () => {
  const message = useSelector((state: IApplicationState) => state.app.message);
  const dispatch = useDispatch();
  console.log(message);
  useEffect(() => {
    dispatch(reduxWorks());
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1>{message}</h1>
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
