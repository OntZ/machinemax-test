import moment from 'moment';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { MachineHistory, MachineStates } from '../services/MachineService';

const appColors = require('../app-colors.scss');

export interface IMachineHistoryChartProps {
  machineHistory: MachineHistory[];
}

export const MachineHistoryChart: React.FC<IMachineHistoryChartProps> = ({machineHistory}) => {
  if (!machineHistory) {
    return null;
  }

  const historyData = machineHistory.map(item => {

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
  })

  return (
    <div className="inner-grid-12">
      <div className="col-lg-12">
        <h3>History</h3>
        <p>On, Idle and Off status for {moment(machineHistory[0].start).format('ddd DD MMM')} - {moment(machineHistory[machineHistory.length - 1].end).format('ddd DD MMM')}</p>
      </div>
      <div className="col-lg-12">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          height={300}
          width={1000}
        >
          <VictoryAxis
            tickValues={historyData.map(datum => datum.x)}
            tickFormat={() => ''}
          />
          <VictoryBar
            data={historyData}
            style={{
              data: {
                fill: ({datum}) => datum.fill
              },
              labels: {
                marginLeft: '200px'
              }
            }}
            barWidth={({datum}) => 0.0000105 * datum.width}
            alignment="start"
            labels={({datum}) => datum.label}
          />
        </VictoryChart>
      </div>
    </div>
  );
}