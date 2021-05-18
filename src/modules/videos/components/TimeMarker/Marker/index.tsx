import React from 'react';
import { MarkerWrapper } from './styled';
import { MarkerPropsType } from './types';

const Marker: React.FC<MarkerPropsType> = (props) => {
  const { marker, duration, onMarkerClick } = props;
  const { time, color, title } = marker;
  const id = String(marker.id);

  const getPosition = () => {
    if (duration) {
      const percent = time <= duration ? time / duration : 1;
      return `calc(${percent * 100}% - 2px)`;
    }
    return '-9999px';
  };

  return (
    <MarkerWrapper
      id={id}
      title={title}
      style={{ background: color, left: getPosition() }}
      onClick={() => onMarkerClick(marker)}
    />
  );
};

export default Marker;
