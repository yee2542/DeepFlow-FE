export const UPLOAD = 'UPLOAD';

type FileUpload = {
  _id: string;
  file: FormData;
  progress: number;
  originFilename: string;
  createAt: Date;
  type: 'single' | 'multiple';
  group: string;
  state: 'waiting' | 'queue' | 'failed' | 'finish' | 'cancel';
};

type GroupTask = {
  label: string;
  progress: number;
  total: number;
};

type UploadTask = {
  url: string;
  pendingQueue: FileUpload[];
  fulfillQueue: FileUpload[];
  present: {
    current: FileUpload[];
    group: GroupTask[];
    progress: number;
    total: number;
  };
};

export type { FileUpload, GroupTask, UploadTask };
