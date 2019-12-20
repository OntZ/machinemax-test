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

export enum MachineStates {
  Active = 'ACTIVE',
  Idle = 'IDLE',
  Off = 'OFF'
}

export type MachineHistory = {
  start: string;
  end: string;
  state: MachineStates;
}

export enum MachinesEndpointStatus {
  Active = 'active',
  Problem = 'problem',
}

export class MachineService {
  public static getAll = async (): Promise<Machine[]> => (await Http.fetch('/machines')).machines;

  public static getById = async (id: string): Promise<Machine> => await Http.fetch('/machines/' + id);

  public static getHistory = async (id: string): Promise<MachineHistory[]> => (await Http.fetch('/machines/' + id + '/history')).history;
}