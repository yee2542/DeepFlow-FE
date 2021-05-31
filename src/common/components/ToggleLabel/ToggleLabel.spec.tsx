import { shallow } from 'enzyme';
import React from 'react';
import ToggleLabel from '.';

describe('Component/ToggleLabel test', () => {
  const mockOnClick = jest.fn();
  it('ToggleLabel children render test', () => {
    const ToggleLabelWithChild = shallow(
      <ToggleLabel onLabelClick={mockOnClick} selected={false} label={'Label'} />,
    );
    expect(ToggleLabelWithChild.text()).toEqual('Label');
  });

  it('ToggleLabel selected props test', () => {
    const ToggleLabelSelectedFalse = shallow(
      <ToggleLabel onLabelClick={mockOnClick} selected={false} label={'Label'} />,
    );
    expect(ToggleLabelSelectedFalse.prop('selected')).toBe(false);

    const ToggleLabelSelectedTrue = shallow(
      <ToggleLabel onLabelClick={mockOnClick} selected={true} label={'Label'} />,
    );
    expect(ToggleLabelSelectedTrue.prop('selected')).toBe(true);
  });
});
