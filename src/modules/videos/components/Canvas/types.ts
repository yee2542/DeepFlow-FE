import { Annotations } from 'Modules/videos/models/types';

export type CanvasPropsType = {
  width: number;
  height: number;
  data: Annotations[];
  played: number;
  videoHeight: number;
  videoWidth: number;
  duration: number;
  selectedLabel: string;
  precision: number;
};
