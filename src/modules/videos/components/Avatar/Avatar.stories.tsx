import { Meta } from '@storybook/react';
import React from 'react';
import { GlobalStyle } from 'Styles/global';
import Avatar from '.';
import { AvatarPropsType } from './types';

export default {
  title: 'FluentSearch/Avatar',
  component: Avatar,
} as Meta;

const AvatarStories: React.FC<AvatarPropsType> = (args) => {
  return (
    <>
      <GlobalStyle />
      <Avatar {...args} />
    </>
  );
};

export const Default = AvatarStories.bind({});
Default.args = {
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  selected: false,
  id: 1,
};

export const Selected = AvatarStories.bind({});
Selected.args = {
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  selected: true,
  id: 2,
};
