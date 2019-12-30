import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { getMachineById, getMachineHistory, stopPollingMachineById } from '../store/machines/machinesActions';
import { IApplicationState } from '../store/rootReducer';
import './MachineDetails.scss';
import { MachineHistoryChart } from '../components/MachineHistoryChart';
import { ServerStatus } from '../components/ServerStatus';
import { Link } from 'react-router-dom';


interface IMachineDetailsParams {
  machineID: string;
}

export type IMachineDetailsProps = RouteComponentProps<IMachineDetailsParams>;

export const MachineDetails = withRouter((props) => {
  const ID = props.match.params.machineID;
  const machineInfo = useSelector((state: IApplicationState) => state.machines.machineById[ID]);
  const machineHistory = useSelector((state: IApplicationState) => state.machines.machineHistoryById[ID]);
  const endpointStatus = useSelector((state: IApplicationState) => state.machines.machineByIdEndpointStatus);
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
        <div className="content-area machine-details__content">
          <div className="col-lg-10 col-md-8 col-sm-6 top-spacing bottom-spacing">
            <Link to="/">{'<'} Home</Link>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 inner-grid-4 top-spacing bottom-spacing">
              <div className="col-lg-3 col-sm-2">
                Server<span className="hidden-sm"> status</span>:
              </div>
              <div className="col-lg-1 col-sm-2">
                <ServerStatus status={endpointStatus} />
              </div>
            </div>
          <div className="col-lg-6">
            <h1 className="machine-details__title">{machine.type + ' ' + machine.name}</h1>
            <div><b>{machine.group}</b></div>
            <div className="inner-grid-2">
              <div className="col-lg-1">
                <div className="machine-details__operation machine-details__operation--active">
                  Active hours: {(machine.activity.activeHours).toFixed(2)}
                </div>
                <div className="machine-details__operation machine-details__operation--idle">
                  Idle hours: {(machine.activity.idleHours).toFixed(2)}
                </div>
                <div className="machine-details__operation machine-details__operation--off">
                  Off hours: {(24 - machine.activity.activeHours - machine.activity.idleHours).toFixed(2)}
                </div>
              </div>
              <div className="col-lg-1 bottom-spacing">
                Accurate as of <br className="hidden-sm"/> {moment(loadedLast).format('DD/MMM HH:mm:ss')}
              </div>
            </div>

          </div>
          <div className="col-lg-6 text-right">
            <img className="machine-details__photo" src={machine.imageURL} alt=""/>
          </div>
          <div className="col-lg-12">
            <MachineHistoryChart machineHistory={machineHistory} />
          </div>
        </div>
      </div>
    );
  }

});
