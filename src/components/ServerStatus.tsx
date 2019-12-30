import React from 'react';

import './ServerStatus.scss';
import { MachinesEndpointStatus } from '../services/MachineService';

export interface IServerStatusProps {
  status: MachinesEndpointStatus;
}

export const ServerStatus: React.FC<IServerStatusProps> = ({status}) => {
  return (
    <div className={`server-status server-status--${status}`}/>
  );
}
