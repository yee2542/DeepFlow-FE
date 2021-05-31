type PlayerState = {
  duration: number;
  played: number;
  playerHeight: number;
  playerWidth: number;
};

type TimeDisplayFormat = 'normal' | 'remaining';

type PlaybackRate = '0.5' | '0.75' | '1.0' | '1.5' | '2.0';

type MediaType = 'video' | 'image' | 'undefined';

type MediaFormat = '.mp4' | '.jpg' | 'undefined';

type PersonPresentType = {
  _id?: string;
  label?: string;
  uri: string;
  nFps: number;
  selected: boolean;
};

type LabelPresentType = {
  cat: string;
  selected: boolean;
  nFps: number[];
};

type IncidentType = {
  bbox: BoundingBoxType;
  last?: boolean;
  prob: number;
  cat: string;
};

type AnnotationResultType = {
  precision: number;
  model: string;
  annotations: Annotations[];
};

type Annotations = {
  _id?: string;
  classes: IncidentType[];
  uri: string;
  nFps: number;
};

type BoundingBoxType = {
  xmax: number;
  ymax: number;
  ymin: number;
  xmin: number;
};

type VideoFileType = {
  originalFileName: string;
  url: string;
  type: MediaType;
  format: MediaFormat;
  width: number;
  height: number;
  date: string;
  place: string;
  deleteFlag: boolean;
  size: number;
};

type MetaDataType = Omit<VideoFileType, 'deleteFlag' | 'incidents' | 'url'>;

export type {
  PlayerState,
  PlaybackRate,
  PersonPresentType,
  LabelPresentType,
  Annotations,
  AnnotationResultType,
  IncidentType,
  MediaType,
  MediaFormat,
  VideoFileType,
  MetaDataType,
  BoundingBoxType,
  TimeDisplayFormat,
};
