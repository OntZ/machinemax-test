import { mapHistoryItemToChartItem } from './MachineHistoryChart';
import { MachineHistory, MachineStates } from '../services/MachineService';

const history: MachineHistory[] = [{
  start: '2019-12-13T00:00:00Z',
  end: '2019-12-13T02:37:00Z',
  state: MachineStates.Active
}, {
  start: '2019-12-13T02:37:00Z',
  end: '2019-12-13T04:37:00Z',
  state: MachineStates.Idle
}, {
  start: '2019-12-13T04:37:00Z',
  end: '2019-12-13T05:37:00Z',
  state: MachineStates.Off
}]

describe('MachineHistoryChart', () => {
  /**
   * These fill values should be the app colors, but that doesn't work in jest
   * and I just don't have any more time to figure out how to mock css modules
   */
  it('makes history data for the bar chart', () =>{
    expect(history.map(mapHistoryItemToChartItem)).toEqual([{
      fill: undefined,
      label: '00:00',
      width: 9420000,
      x: 1576195200000,
      y: 2,
    },
    {
      fill: undefined,
      label: '02:37',
      width: 7200000,
      x: 1576204620000,
      y: -1,
    },
    {
      fill: undefined,
      label: '04:37',
      width: 3600000,
      x: 1576211820000,
      y: -0.5,
    },
  ]);});
})