import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import './MachineDetails.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../store/rootReducer';
import { getMachineById, stopPollingMachineById, getMachineHistory } from '../store/machines/machinesActions';
import moment from 'moment';

interface IMachineDetailsParams {
  machineID: string;
}

export type IMachineDetailsProps = RouteComponentProps<IMachineDetailsParams>;

export const MachineDetails = withRouter((props) => {
  const ID = props.match.params.machineID;
  const machineInfo = useSelector((state: IApplicationState) => state.machines.machineById[ID]);
  const machineHistory = useSelector((state: IApplicationState) => state.machines.machineHistoryById[ID]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMachineById(ID));
    dispatch(getMachineHistory(ID));
    return () => {
      dispatch(stopPollingMachineById());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!machineInfo) {
    return <div>Loading...</div>
  } else {
    const { machine, loadedLast } = machineInfo;
    return (
      <div className="machine-details">
        <div className="content-area machine-details__content top-spacing">
          <div className="col-lg-12 bottom-spacing">
            <a href="/">{'<'} Home</a>
          </div>
          <div className="col-lg-6">
            <h1 className="machine-details__title">{machine.type + ' ' + machine.name}</h1>
            <div>{machine.group}</div>
          </div>
          <div className="col-lg-6">
            <img className="machine-details__photo" src={machine.imageURL} alt=""/>
          </div>
          <div className="col-lg-12">

            Accurate as of {moment(loadedLast).format('DD/MMM HH:mm:ss')}
            <pre>{JSON.stringify(machine, null, 4)}</pre>
            <pre>{JSON.stringify(machineHistory, null, 4)}</pre>
          </div>
        </div>
      </div>
    );
  }

});
