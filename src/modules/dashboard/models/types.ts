import { ModelEnum } from 'Modules/dashboard/constants/model.enum';
import { ErrorState } from 'Stores/common/types/error';
import { InsightModelEnum } from '../../../common/generated/generated-types';
import { AlbumPreviewProps } from '../components/AlbumPreview/types';

export const DASHBOARD = 'DASHBOARD';

export type DashboardState = {
  data: {
    dashboardData: DashboardData;
    albumPreviewData: AlbumPreviewProps[];
  };
  presentation: {
    totalPhotos: number;
    totalVideos: number;
    todayPhotos: number;
    todayVideos: number;
    upcomingModel: string;
    model: ModelEnum;
    processWithModelPhoto: number;
    finishRunningPhotos: number;
    totalRunningPhotos: number;
    progressPhoto: number;
  };
  ready: boolean;
  error?: ErrorState;
};

export type DashboardData = {
  totalPhotos: number;
  totalVideos: number;
  todayPhotos: number;
  todayVideos: number;
  upcomingModel: string;
  model: ModelEnum;
  processWithModelPhoto: number;
  finishRunningPhotos: number;
  totalRunningPhotos: number;
  progressPhoto: number;
};

export type Insight = {
  keyword: string;
  model: InsightModelEnum;
};

export type DashboardCardType = {
  data: Dashboard;
};

export type OverviewAlbumType = {
  data: FileInsight[];
};

export type FileInsightMeta = {
  _id: string;
  type: string;
  uri: string;
  uri_thumbnail: string;
  original_filename: string;
};

export type FileInsight = {
  fileMeta: FileInsightMeta;
  insights: Insight[];
};

export type DataDashboard = {
  total: number;
  today: number;
};

export type FileDashboard = {
  photo: DataDashboard;
  video: DataDashboard;
};

export type Dashboard = {
  FileDashboardData: FileDashboard;
  FileInsightDashboardData: FileInsight[];
};
