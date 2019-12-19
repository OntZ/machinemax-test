import React from 'react';
import './App.scss';
import { MachinesList } from './pages/MachinesList';

export const App: React.FC = () => {

  return (
    <div className="App">
      <MachinesList />
    </div>
  );
}
