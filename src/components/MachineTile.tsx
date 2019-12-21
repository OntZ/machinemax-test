import React from 'react';
import { Link } from 'react-router-dom';
import { VictoryPie, VictoryContainer } from 'victory';

import './MachineTile.scss';
import { Machine } from '../services/MachineService';
import { AppModeContext } from '../App';

const appColors = require('../app-colors.scss');

export interface IMachineTileProps {
  machine: Machine;
}

export const MachineTile: React.FC<IMachineTileProps> = ({machine}) => {

  const onTime = machine.activity.activeHours;
  const idleTime = machine.activity.idleHours;
  const engineTime = onTime + idleTime;
  const offTime = 24 - engineTime;

  const chartData: {
    x: string;
    y: number;
  }[] = [];
  const colorScale: string[] = [];

  if (onTime > 0) {
    chartData.push({
      x: 'On: ' + onTime.toFixed(1),
      y: onTime
    });
    colorScale.push(appColors.operationOn);
  }

  if (idleTime > 0) {
    chartData.push({
      x: 'Idle ' + idleTime.toFixed(1),
      y: idleTime
    });
    colorScale.push(appColors.operationIdle)
  }

  if (offTime > 0) {
    chartData.push({
      x: 'Off ' + offTime.toFixed(1),
      y: offTime
    });
    colorScale.push(appColors.operationOff);
  }

  return (
    <div className="machine-tile">
      <div className="machine-tile__name">
        <div>
          <Link to={`/${machine.id}`}>
            <b>{machine.type + ' ' + machine.name}</b>
          </Link>
        </div>
        <div>{machine.group}</div>
      </div>
      <div className="machine-tile__info">
        <Link className="machine-tile__thumbnail-link" to={`/${machine.id}`}>
          <img src={machine.thumbURL} alt="" />
        </Link>
        <div className="machine-tile__status-chart">
          <AppModeContext.Consumer>
            {isNightMode => <VictoryPie
            colorScale={colorScale}
            height={170}
            width={220}
            startAngle={-90}
            endAngle={90}
            data={chartData}
            labelRadius={70}
            radius={50}
            style={{
              labels: {
                fill: isNightMode ? '#ddd' : '#333'
              }
            }}
            containerComponent={<VictoryContainer responsive={true}/>}
          />}
          </AppModeContext.Consumer>

        </div>
      </div>
      <div className="machine-tile__name">
        <div>sensor: {machine.sensorID}</div>
        <div><b>total: {engineTime.toFixed(1)} hrs</b></div>
      </div>
    </div>
  );
}
