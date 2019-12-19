import React, { useEffect, useState } from 'react';
import './MachinesList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getMachines } from '../store/machines/machinesActions';
import { Machine, MachinesEndpointStatus, MachineActivityKeys, ACTIVE_HOURS, IDLE_HOURS } from '../services/MachineService';
import moment from 'moment';
// import { IMachinesState } from '../store/machines/machinesTypes';
import { MachineTile } from '../components/MachineTile';
import { IApplicationState } from '../store/rootReducer';
import { ServerStatus } from '../components/ServerStatus';

export const namefilterFn = (nameFilter: string) => (machine: Machine) => machine.name.toLocaleLowerCase().indexOf(nameFilter.toLocaleLowerCase()) > -1
export const timeSortFn = (timeSort: MachineActivityKeys | '') => (m1: Machine, m2: Machine) =>
  timeSort
    ? m2.activity[timeSort] - m1.activity[timeSort]
    : 1;

export const MachinesList: React.FC = () => {
  const machines: Machine[] = useSelector((state: IApplicationState) => state.machines.machines).sort((m1, m2) => {
    if (m1.name > m2.name) return 1;
    if (m1.name < m2.name) return -1;
    return 0;
  });
  const machinesLoadedLast: Date | undefined = useSelector((state: IApplicationState) => state.machines.machinesLoadedLast);
  const machinesEndpointStatus: MachinesEndpointStatus = useSelector((state: IApplicationState) => state.machines.machinesEndpointStatus);
  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState('');
  const [timeSort, setTimeSort] = useState<MachineActivityKeys | ''>('');
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    dispatch(getMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let filteredMachines = machines.filter(namefilterFn(nameFilter)).sort(timeSortFn(timeSort));
  const availableSites: string[] = [];
  filteredMachines.forEach(machine => {
    if (availableSites.indexOf(machine.group) <= -1) {
      availableSites.push(machine.group);
    }
  });

  filteredMachines = filteredMachines.filter(machine => groupFilter ? machine.group === groupFilter : true);

  const renderFilters = () => (<div className="col-lg-12 inner-grid-12 column-gap machines-list__filters">
    <div className="col-lg-4">
      <label htmlFor="#name-fiter">Search by name:</label>
      <input id="name-filter" value={nameFilter} onChange={(e) => setNameFilter(e.currentTarget.value)} />
    </div>
    <div className="col-lg-4">
      <label htmlFor="#time-sort">Sort by active/idle time:</label>
      <select id="time-sort" value={timeSort} onChange={(e) => setTimeSort(e.currentTarget.value as MachineActivityKeys | '')}>
        {/** Maybe some nice iteration over enum */}
        <option value=""/>
        <option value={ACTIVE_HOURS}>Active time</option>
        <option value={IDLE_HOURS}>Idle time</option>
      </select>
    </div>
    <div className="col-lg-4">
      <label htmlFor="#site-filter">Filter by site:</label>
      <select id="site-filter" value={groupFilter} onChange={(e) => setGroupFilter(e.currentTarget.value)}>
        <option value=""/>
        {availableSites.map(site => <option key={site} value={site}>{site}</option>)}
      </select>
    </div>
    <div className="col-lg-12">
      <a className="machines-list__reset-filters" href="/#" onClick={e => {
        e.preventDefault();
        setNameFilter('');
        setTimeSort('');
        setGroupFilter('');
      }}>
        Reset filters
      </a>
    </div>
  </div>)

  return (
    <div className="machines-list">
      <div className="content-area bottom-spacing">
        <h2 className="col-lg-12">Status for all your machines</h2>
        <div className="col-lg-12 inner-grid-12 column-gap bottom-spacing machines-list__status">
          {machinesLoadedLast
          ? <div className="col-lg-8">Accurate as of {moment(machinesLoadedLast).format('DD/MMM HH:mm:ss')}</div>
          : null}
          <div className="col-lg-3 col-sm-8">
            Server status:
          </div>
          <div className="col-lg-1 col-sm-4">
            <ServerStatus status={machinesEndpointStatus} />
          </div>
        </div>
        {renderFilters()}
      </div>
      <div className="content-area column-gap row-gap bottom-spacing">
        {filteredMachines.map(machine => <div key={machine.id} className="col-lg-4 col-md-6">
          <MachineTile machine={machine} />
        </div>)}
      </div>
    </div>
  );
}
