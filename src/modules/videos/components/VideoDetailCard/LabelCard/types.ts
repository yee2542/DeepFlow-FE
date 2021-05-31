import { LabelPresentType } from 'Modules/videos/models/types';

export type LabelCardPropsType = {
  totalIncidents: number;
  incidents: LabelPresentType[];
  onMarkerClick: (nFps: number) => void;
  onLabelClick: (label: string) => void;
  selectedLabel: string;
  duration: number;
  selectedTime: number;
};
