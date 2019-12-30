import moment from 'moment';
import React from 'react';
import { VictoryBar } from 'victory';
import { MachineHistory, MachineStates } from '../services/MachineService';

const appColors = require('../app-colors.scss');

export const mapHistoryItemToChartItem = (item: MachineHistory) => {

  const x = new Date(item.start).getTime();

  let y = 0;
  let fill = '';
  switch (item.state) {
    case MachineStates.Active:
      y = 2;
      fill = appColors.operationOn;
      break;
    case MachineStates.Idle:
      y = -1;
      fill = appColors.operationIdle;
      break;
    case MachineStates.Off:
      y = -0.5;
      fill = appColors.operationOff;
  }

  return {
    x,
    y,
    fill,
    label: moment(x).format('HH:mm'),
    width: new Date(item.end).getTime() - x
  }
}

export interface IMachineHistoryChartProps {
  machineHistory: MachineHistory[];
}

export const MachineHistoryChart: React.FC<IMachineHistoryChartProps> = ({machineHistory}) => {
  if (!machineHistory) {
    return null;
  }

  const historyData = machineHistory.map(mapHistoryItemToChartItem)

  return (
    <div className="inner-grid-12">
      <div className="col-lg-12">
        <VictoryBar
          height={300}
          width={1000}
          data={historyData}
          style={{
            data: {
              fill: ({datum}) => datum.fill
            },
            labels: {
              fill: '#888'
            }
          }}
          barWidth={({datum}) => 0.0000105 * datum.width}
          alignment="start"
          labels={({datum}) => datum.label}
        />
      </div>
      <div className="col-lg-12">
        <p>On, Idle and Off status for {moment(machineHistory[0].start).format('ddd DD MMM')} - {moment(machineHistory[machineHistory.length - 1].end).format('ddd DD MMM')}</p>
      </div>
    </div>
  );
}