export type AlbumPreviewProps = {
  src: string;
  children?: React.ReactNode;
  albumName?: string;
  albumLength?: number;
  label: Array<string>;
  //TODO: - required link when have a real props link
  link?: string;
};
