import { Http } from "./Http"

export const ACTIVE_HOURS = 'activeHours';
export const IDLE_HOURS = 'idleHours';

export type MachineActivityKeys = typeof ACTIVE_HOURS | typeof IDLE_HOURS;

export type MachineActivity = {
  [k in MachineActivityKeys]: number;
}

export type Machine = {
  activity: MachineActivity,
  group: string;
  id: string;
  imageURL: string;
  name: string;
  sensorID: string;
  thumbURL: string;
  type: string;
}

export enum MachinesEndpointStatus {
  Active = 'active',
  Problem = 'problem',
}

export class MachineService {
  public static getAll = async () => {
    const res = await Http.fetch('/machines');

    return res.machines;
  }
}