import styled from 'styled-components';

const Header = styled.h3`
  color: var(--secondary-color);
`;

const DetailHeader = styled.span`
  font-weight: bold;
`;

const VideoPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
`;

const VideoPlayer = styled.video`
  ::-webkit-media-controls-fullscreen-button {
    display: none;
  }

  background: black;
  width: 100%;
  height: 100%;
`;

export { Header, DetailHeader, VideoPlayerWrapper, VideoPlayer };
