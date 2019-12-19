import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import './MachineDetails.scss';

interface IMachineDetailsParams {
  machineID: string;
}

export type IMachineDetailsProps = RouteComponentProps<IMachineDetailsParams>;

export const MachineDetails = withRouter((props) => {
  return (
    <div className="machine-details">
      <div>
        <a href="/">{'<'} Home</a>
      </div>
      machine id: {props.match.params.machineID}
    </div>
  );
});
