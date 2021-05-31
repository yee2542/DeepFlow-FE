import { LabelPresentType } from 'Modules/videos/models/types';

export type MarkerPropsType = {
  incident: LabelPresentType;
  duration: number;
  onMarkerClick: (nFps: number) => void;
};
