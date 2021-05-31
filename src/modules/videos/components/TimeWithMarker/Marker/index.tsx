import React from 'react';
import { MarkerWrapper } from './styled';
import { MarkerPropsType } from './types';

const Marker: React.FC<MarkerPropsType> = (props) => {
  const { incident, duration, onMarkerClick } = props;

  const getPosition = (time: number) => {
    if (duration) {
      const percent = time <= duration ? time / duration : 1;
      return `calc(${percent * 100}% - 2px)`;
    }
    return '-9999px';
  };

  return (
    <>
      {incident.nFps.map((el, index) => (
        <MarkerWrapper
          key={index}
          style={{ left: getPosition(el) }}
          onClick={() => onMarkerClick(el)}
        />
      ))}
    </>
  );
};

export default Marker;
