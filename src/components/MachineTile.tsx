import React from 'react';

import './MachineTile.scss';
import { Machine } from '../services/MachineService';
import { VictoryPie, VictoryContainer } from 'victory';

export interface IMachineTileProps {
  machine: Machine;
}

export const MachineTile: React.FC<IMachineTileProps> = ({machine}) => {

  const onTime = machine.activity.activeHours;
  const idleTime = machine.activity.idleHours;
  const engineTime = onTime + idleTime;
  const offTime = 24 - engineTime;

  const chartData = [];
  const colorScale = [];

  if (onTime > 0) {
    chartData.push({
      x: 'On: ' + onTime.toFixed(1),
      y: onTime
    });
    colorScale.push('green');
  }

  if (idleTime > 0) {
    chartData.push({
      x: 'Idle ' + idleTime.toFixed(1),
      y: idleTime
    });
    colorScale.push('yellow')
  }

  if (offTime > 0) {
    chartData.push({
      x: 'Off ' + offTime.toFixed(1),
      y: offTime
    });
    colorScale.push('grey');
  }

  return (
    <div className="machine-tile">
      <div className="machine-tile__name">
        <div>
          <a href={`/${machine.id}`}>
            <b>{machine.type + ' ' + machine.name}</b>
          </a>
        </div>
        <div>{machine.group}</div>
      </div>
      <div className="machine-tile__info">
        <a href={`/${machine.id}`}>
          <img src={machine.thumbURL} alt="" />
        </a>
        <div className="machine-tile__status-chart">
          <VictoryPie
            colorScale={colorScale}
            height={170}
            width={220}
            startAngle={-90}
            endAngle={90}
            data={chartData}
            labelRadius={70}
            radius={50}
            containerComponent={<VictoryContainer responsive={true}/>}
          />
        </div>
      </div>
      <div className="machine-tile__name">
        <div>sensor: {machine.sensorID}</div>
        <div><b>total: {engineTime.toFixed(1)} hrs</b></div>
      </div>
    </div>
  );
}
