import {
  CarOutlined,
  HomeOutlined,
  BookOutlined,
  HistoryOutlined,
  InboxOutlined,
  PictureOutlined,
  DeleteOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import React from 'react';

interface IconSelectorProps {
  type: string;
}

const IconSelector: React.FC<IconSelectorProps> = (props: IconSelectorProps) => {
  const Icons = {
    CarOulined: <CarOutlined />,
    HomeOutlined: <HomeOutlined />,
    BookOutlined: <BookOutlined />,
    HistoryOutlined: <HistoryOutlined />,
    InboxOutlined: <InboxOutlined />,
    PictureOutlined: <PictureOutlined />,
    DeleteOutlined: <DeleteOutlined />,
    PlaySquareOutlined: <PlaySquareOutlined />,
  };

  const getIcon = (type: string) => {
    let defaultIcon = <CarOutlined />;
    const inputIcon = type;

    const found = Object.entries(Icons).find(
      ([e]) => e.toLowerCase() === inputIcon.toLowerCase(),
    );
    if (found) {
      [, defaultIcon] = found;
    }

    return defaultIcon;
  };

  return getIcon(props.type);
};

export default IconSelector;
