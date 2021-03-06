import HomeLayout from 'Modules/home/components/Layouts';
import { shallow } from 'enzyme';
import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

describe('Components/HomeLayout test', () => {
  it('Render correcly', () => {
    const wrap = <HomeLayout />;
    expect(wrap).toMatchSnapshot();
  });

  it('HomeLayout should be exisiting', () => {
    const wrap = shallow(<HomeLayout />);
    expect(wrap.exists()).toBe(true);
  });

  it('Should contain Content', () => {
    const wrap = shallow(<HomeLayout />);
    expect(wrap.exists(Content)).toBe(true);
  });

  it('Should contain Footer', () => {
    const wrap = shallow(<HomeLayout />);
    expect(wrap.exists(Footer)).toBe(true);
  });
});
