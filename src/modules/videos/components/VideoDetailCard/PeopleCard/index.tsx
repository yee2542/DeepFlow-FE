import React from 'react';
import Avatar from '../../Avatar';
import { VideoDetailCard } from '../styled';
import { PeopleCardPropsType } from './types';

const PeopleCard: React.FC<PeopleCardPropsType> = (props) => {
  const { totalPeople, incidents, handleSelectAvatar } = props;
  return (
    <VideoDetailCard title={`${totalPeople} People`} extra={'clear'}>
      {totalPeople > 0
        ? incidents.map((el, index) => (
            <Avatar
              src={el.uri}
              key={index}
              index={index}
              handleOnClick={(index: number) => handleSelectAvatar(index)}
              selected={el.selected}
            />
          ))
        : 'no people'}
    </VideoDetailCard>
  );
};

export default PeopleCard;
