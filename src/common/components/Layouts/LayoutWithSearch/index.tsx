import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';
import InstantSearch from 'Modules/photos/components/InstantSearch';
import {
  DROPDOWN_SIDEBAR_CONSTANT,
  PHOTOS_SIDEBAR_CONSTANT,
} from 'Modules/photos/constants/menu/index';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import IconSelector from 'Utils/icon-selector';
import pathJoin from 'Utils/path-join';
import {
  CanvasWrapper,
  ContentWithPadding,
  ContentWrapper,
  IconWrapper,
  MenuItem,
  MenuWrapper,
  SiderWrapper,
  UserWrapper,
} from './styled';
import { AllPhotoLayoutProps } from './types';

const { Header } = Layout;

const MenuContainer: React.FC = () => {
  const router = useRouter();
  return (
    <>
      {PHOTOS_SIDEBAR_CONSTANT.map(({ key, label, link, icon }) => {
        const isSelecting = '/' + link === router.pathname;
        return (
          <Link href={pathJoin(link)} key={key}>
            <MenuItem isSelecting={isSelecting}>
              <p>
                <IconWrapper>
                  <IconSelector type={icon as string} />
                </IconWrapper>
                {label}
              </p>
            </MenuItem>
          </Link>
        );
      })}
    </>
  );
};

const Sider: React.FC = () => (
  <SiderWrapper>
    <Row justify="center">
      <Col>
        <Image
          src={'assets/images/logo-with-bg.svg'}
          layout="fixed"
          width={180}
          height={80}
        />
      </Col>
    </Row>
    <MenuWrapper>
      <MenuContainer />
    </MenuWrapper>
  </SiderWrapper>
);

const DropdownMenu = (
  <Menu>
    {DROPDOWN_SIDEBAR_CONSTANT.map(({ key, label, link }) => {
      return (
        <Menu.Item key={key}>
          <Link href={pathJoin(link)}>{label}</Link>
        </Menu.Item>
      );
    })}
  </Menu>
);

const UserContainer: React.FC = () => {
  return (
    <UserWrapper>
      <Dropdown overlay={DropdownMenu} placement="bottomRight" trigger={['click']}>
        <Avatar>J</Avatar>
      </Dropdown>
    </UserWrapper>
  );
};

const HeaderWrapper: React.FC = () => {
  return (
    <Header>
      <Row justify="center">
        <Col xl={8}>
          <InstantSearch />
        </Col>
        <Col xl={4} push={3}>
          <UserContainer />
        </Col>
      </Row>
    </Header>
  );
};

const LayoutWithSearch: React.FC<AllPhotoLayoutProps> = (props) => {
  const { title, children, border = true } = props;
  const router = useRouter();

  return (
    <CanvasWrapper>
      <Layout>
        <Sider />
        <ContentWrapper>
          <HeaderWrapper />
          {router.pathname === '/dashboard' ? (
            <ContentWithPadding>{children}</ContentWithPadding>
          ) : (
            <ContentWithPadding padding={true}>
              <h1>{title}</h1>
              {border ? <hr /> : null}
              {children}
            </ContentWithPadding>
          )}
        </ContentWrapper>
      </Layout>
    </CanvasWrapper>
  );
};

export default LayoutWithSearch;
