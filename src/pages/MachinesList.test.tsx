import { Machine } from "../services/MachineService";
import { namefilterFn, timeSortFn } from './MachinesList';

const M1: Machine = {
  activity: {activeHours: 12.6, idleHours: 5.3},
  group: "North Site",
  id: "000000007",
  imageURL: "https://api.machinemax.com/v1/images/machines/49e2385e4ac58be8d3bfe3096f69d9ae",
  name: "KOM222",
  sensorID: "EFABD",
  thumbURL: "https://api.machinemax.com/v1/images/machines/49e2385e4ac58be8d3bfe3096f69d9ae/75x75",
  type: "EXCAVATOR"
}

const M2: Machine = {
  activity: {activeHours: 5.6, idleHours: 7.3},
  group: "West Site",
  id: "000000008",
  imageURL: "https://api.machinemax.com/v1/images/machines/49e2385e4ac58be8d3bfe3096f69d9ae",
  name: "MOK223",
  sensorID: "FFADB",
  thumbURL: "https://api.machinemax.com/v1/images/machines/49e2385e4ac58be8d3bfe3096f69d9ae/75x75",
  type: "CRANE"
}

const machines:Machine[] = [M1, M2]

describe('MachinesList', () => {
  it('filters machines by group', () =>{
    expect(machines.filter(namefilterFn('KOM'))).toEqual([M1]);
  });
  it('sorts machines by idle time', () => {
    expect(machines.sort(timeSortFn('idleHours'))).toEqual([M2, M1]);
  })
  it('sorts machines by active time', () => {
    expect(machines.sort(timeSortFn('activeHours'))).toEqual([M1, M2]);
  })
  it('returns the array in the same order when time key is empty', () => {
    expect(machines.sort(timeSortFn(''))).toEqual(machines);
  })
})