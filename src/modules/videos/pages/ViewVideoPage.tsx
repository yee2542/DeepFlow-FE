import { Row, Col } from 'antd';
import LayoutWithSearch from 'Components/Layouts/LayoutWithSearch';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from 'Stores/index';
import { fetchInsightData } from '../reducers/insightReducer/actions';
import { fetchVideoData } from '../reducers/videoReducer/actions';
import { Header, VideoPlayer, VideoPlayerWrapper } from './styled';
import { insightActions } from '../reducers/insightReducer';
import PeopleCard from '../components/VideoDetailCard/PeopleCard';
import LabelCard from '../components/VideoDetailCard/LabelCard';
import DetailCard from '../components/VideoDetailCard/DetailCard';
import Canvas from '../components/Canvas';
import { PlayerState } from '../models/types';

const ViewVideoPage: React.FC = () => {
  const dispatch = useDispatch();
  const pathData = router.query;

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedTime, setSelectedTime] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>({
    duration: 0,
    played: 0,
    playerHeight: 0,
    playerWidth: 0,
  });

  const videoHeight = useSelector(
    (state: StoresState) => state.video.present.metaData.height,
  );
  const videoWidth = useSelector(
    (state: StoresState) => state.video.present.metaData.width,
  );
  const date = useSelector((state: StoresState) => state.video.present.metaData.date);
  const originalFileName = useSelector(
    (state: StoresState) => state.video.present.metaData.originalFileName,
  );
  const format = useSelector((state: StoresState) => state.video.present.metaData.format);
  const size = useSelector((state: StoresState) => state.video.present.metaData.size);
  const width = useSelector((state: StoresState) => state.video.present.metaData.width);
  const height = useSelector((state: StoresState) => state.video.present.metaData.height);
  const place = useSelector((state: StoresState) => state.video.present.metaData.place);
  const url = useSelector((state: StoresState) => state.video.videoFile.url);

  const incidents = useSelector((state: StoresState) => state.insight.present.label);
  const personIncidents = useSelector(
    (state: StoresState) => state.insight.present.person,
  );
  const incidentData = useSelector(
    (state: StoresState) => state.insight.data.annotations,
  );
  const selectedLabel = useSelector(
    (state: StoresState) => state.insight.present.selectedLabel,
  );
  const precision = useSelector((state: StoresState) => state.insight.present.precision);
  const model = useSelector((state: StoresState) => state.insight.present.model);

  const totalPeople = personIncidents.length;
  const totalIncidents = incidents.length;

  const handleSelectAvatar = (index: number) => {
    dispatch(insightActions.setSelectedPerson({ index: index }));
  };

  const handleMarkerClick = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time - 0.5;
    setSelectedTime(time);
  };

  const handleLabelClick = (selectedLabel: string) => {
    dispatch(insightActions.setSelectedLabel({ category: selectedLabel }));
  };

  const handlePlayerResize = () => {
    if (videoRef.current?.clientHeight && videoRef.current?.clientWidth) {
      setPlayerState((prevState) => ({
        ...prevState,
        playerHeight: videoRef.current?.clientHeight || 0,
        playerWidth: videoRef.current?.clientWidth || 0,
      }));
    }
  };

  const handleDuration = () => {
    if (videoRef.current)
      setPlayerState((prevState) => ({
        ...prevState,
        duration: videoRef.current?.duration || 0,
      }));
  };

  const handlePlayed = () => {
    if (videoRef.current) {
      const played = videoRef.current && videoRef.current?.currentTime;
      setPlayerState((prevState) => ({
        ...prevState,
        played: played || 0,
      }));
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      window.addEventListener('resize', handlePlayerResize);
      videoRef.current.addEventListener('timeupdate', handlePlayed);
    }

    return () => {
      if (!videoRef.current) return;
      videoRef.current?.removeEventListener('webkitfullscreenchange', () => {
        console.log('remove');
      });
    };
  }, [videoRef]);

  useEffect(() => {
    dispatch(fetchVideoData());
    dispatch(fetchInsightData());
    handleDuration();
    handlePlayerResize();
  }, []);

  return (
    <LayoutWithSearch border={false}>
      {'<'} Photos <br />
      <Header>{originalFileName}</Header>
      <hr />
      <Row style={{ marginTop: '5%' }}>
        <Col span={13}>
          <VideoPlayerWrapper ref={playerContainerRef}>
            <Canvas
              selectedLabel={selectedLabel}
              duration={playerState.duration}
              width={playerState.playerWidth}
              height={playerState.playerHeight}
              data={incidentData}
              played={playerState.played}
              videoHeight={videoHeight}
              videoWidth={videoWidth}
              precision={precision}
            />
            <VideoPlayer ref={videoRef} controls muted autoPlay preload="auto">
              {/* TODO: Dynamic route */}
              <source type="video/mp4" src={`videos/sample.mp4`} />
              <source type="video/webm" src={`videos/sample.webm`} />
              <source type="video/mp4" src={`videos/sample.m4v`} />
              <source type="video/ogg" src={`videos/sample.ogv`} />
            </VideoPlayer>
          </VideoPlayerWrapper>
          <br />
          <DetailCard
            model={model}
            date={date}
            width={width}
            height={height}
            size={size}
            place={place}
            originalFileName={originalFileName}
            format={format}
          />
        </Col>
        <Col span={10} offset={1}>
          <PeopleCard
            totalPeople={totalPeople}
            incidents={personIncidents}
            handleSelectAvatar={handleSelectAvatar}
          />
          <br />
          <LabelCard
            selectedTime={selectedTime}
            duration={playerState.duration}
            totalIncidents={totalIncidents}
            incidents={incidents}
            onMarkerClick={handleMarkerClick}
            onLabelClick={handleLabelClick}
            selectedLabel={selectedLabel}
          />

          <br />
        </Col>
      </Row>
    </LayoutWithSearch>
  );
};

export default ViewVideoPage;
