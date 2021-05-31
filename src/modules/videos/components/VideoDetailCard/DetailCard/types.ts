import { MediaFormat } from 'Modules/videos/models/types';

export type DetailCardPropsType = {
  date: string;
  width: number;
  height: number;
  size: number;
  place: string;
  originalFileName: string;
  format: MediaFormat;
  model: string;
};
