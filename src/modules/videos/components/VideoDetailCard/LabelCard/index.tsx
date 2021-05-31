import ToggleLabel from 'Components/ToggleLabel';
import React from 'react';
import TimeWithMarker from '../../TimeWithMarker';
import { VideoDetailCard } from '../styled';
import { LabelCardPropsType } from './types';

const LabelCard: React.FC<LabelCardPropsType> = (props) => {
  const {
    incidents,
    totalIncidents,
    onMarkerClick,
    onLabelClick,
    selectedLabel,
    duration,
    selectedTime,
  } = props;
  return (
    <VideoDetailCard title={`${totalIncidents} Labels`}>
      {incidents.map((el, index) => (
        <ToggleLabel
          key={index}
          onLabelClick={onLabelClick}
          selected={el.selected}
          label={el.cat}
        />
      ))}
      <TimeWithMarker
        duration={duration}
        incidents={incidents}
        onClick={onMarkerClick}
        selectedLabel={selectedLabel}
      />
      <br />
      SELECTED TIME: {selectedTime}
    </VideoDetailCard>
  );
};

export default LabelCard;
