import { ReactNode } from 'react';

export type ImageProps = {
  url: string;
  key: string;
};

export type AllPhotoLayoutProps = {
  children?: ReactNode;
  title?: string;
  border?: boolean;
};
