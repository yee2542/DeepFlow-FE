import React from 'react';
import { useRouter } from 'next/router';
import {
  AlbumWrapper,
  Label,
  Container,
  Text,
  AlbumDetailsWrapper,
  LabelWrapper,
} from './styled';
import { AlbumPreviewProps } from './types';

const AlbumPreview: React.FC<AlbumPreviewProps> = (props) => {
  //TODO: destructing link from props when have a real props link
  const { src, albumName, albumLength, label } = props;
  const router = useRouter();
  const link = '/';
  return (
    <AlbumWrapper>
      <Container onClick={() => router.push(link)}>
        <img src={src} />
        {/* TODO:change to 'view album' when have an album*/}
        <Text id="text">View Photo</Text>
      </Container>

      <AlbumDetailsWrapper>
        <span>
          <b>{albumName}</b>
        </span>
        <br />
        {/* <span>{albumLength} items</span> */}
        <br />
      </AlbumDetailsWrapper>
      <LabelWrapper>
        {label.map((e, i) => (
          <Label color="purple" key={i}>
            {e}
          </Label>
        ))}
      </LabelWrapper>
    </AlbumWrapper>
  );
};

export default AlbumPreview;
