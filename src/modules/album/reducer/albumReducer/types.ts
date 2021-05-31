import { ErrorState } from '../../../../common/stores/common/types/error';

export const ALBUM = 'ALBUM';

export type Album = {
  id: string;
  name: string;
  albumFiles: string[];
  label?: string[];
  thumbnail_uri?: string;
  owner: string;
};

export type AlbumState = {
  data: Album[];
  present: {
    album: Album[];
  };
  ready: boolean;
  error?: ErrorState;
};
