import React from 'react';
import Marker from './Marker';
import { TimeWithMarkerWrapper } from './styled';
import { TimeWithMarkerPropsType } from './types';

const TimeWithMarker: React.FC<TimeWithMarkerPropsType> = (props) => {
  const { incidents, onClick, selectedLabel, duration } = props;
  return (
    <TimeWithMarkerWrapper>
      {incidents &&
        incidents
          .filter((incident) => incident.cat === selectedLabel)
          .map((incident, index) => (
            <Marker
              key={index}
              incident={incident}
              onMarkerClick={onClick}
              duration={duration}
            />
          ))}
    </TimeWithMarkerWrapper>
  );
};

export default TimeWithMarker;
