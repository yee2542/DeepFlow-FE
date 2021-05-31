import { MetaDataType, VideoFileType } from 'Modules/videos/models/types';
import { ErrorState } from 'Stores/common/types/error';

const VIDEO = 'VIDEO';

type initVideoStateType = {
  videoFile: VideoFileType;
  present: {
    metaData: MetaDataType;
  };
  ready: boolean;
  error?: ErrorState;
};

export { VIDEO };
export type { initVideoStateType };
