import { Http } from "./Http"

export type MachineActivity = {
  activeHours: number;
  idleHours: number;
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

export class MachineService {
  public static getAll = async () => {
    const res = await Http.fetch('/machines');

    return res.machines;
  }
}