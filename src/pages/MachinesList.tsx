import React, { useEffect } from 'react';
import './MachinesList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getMachines } from '../store/machines/machinesActions';
import { Machine } from '../services/MachineService';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
// import { IMachinesState } from '../store/machines/machinesTypes';
import { MachineTile } from '../components/MachineTile';
import { IApplicationState } from '../store/rootReducer';

export const MachinesList: React.FC = () => {
  const machines: Machine[] = useSelector((state: IApplicationState) => state.machines.machines);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  useEffect(() => {
    dispatch(getMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(machines);
  return (
    <div className="machines-list">
      <div className="content-area">

        {machines.map(machine => <div key={machine.id} className="col-lg-4 col-md-6">
          <MachineTile machine={machine} />
        </div>)}
      </div>
    </div>
  );
}
