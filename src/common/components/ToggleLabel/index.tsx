import React from 'react';
import { ToggelLabelWrapper } from './styled';
import { ToggleLabelProps } from './types';

const ToggleLabel: React.FC<ToggleLabelProps> = (props) => {
  const { label, selected = false, onLabelClick } = props;
  return (
    <ToggelLabelWrapper selected={selected} onClick={() => onLabelClick(label)}>
      {label}
    </ToggelLabelWrapper>
  );
};

export default ToggleLabel;
