import {
  LightboxWrapper,
  LightboxCard,
  LightboxCardLeft,
  OptionWrapper,
  LightboxCardRight,
  ButtonLeft,
  ButtonRight,
  ImageWrapper,
  InfoButton,
  Image,
  Overlay,
} from './styled';
import React, { useState, useEffect, useRef } from 'react';
import BoundingBox from '../BoundingBox';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { LightboxPropsType, currentImageSizeType, FileInsight } from './types';
import { Row, Col, Tag } from 'antd';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import {
  InsightDto,
  useGetFileImageInsightQuery,
} from '../../../../common/generated/generated-types';
import { initState } from './init';
import filesize from 'filesize';

const TagRender: React.FC<{ tags?: string[] }> = (props) => {
  const { tags } = props;
  return <>{tags && tags.map((e, index) => <Tag key={index}>{e}</Tag>)}</>;
};

const Lightbox: React.FC<LightboxPropsType> = (props) => {
  const { image, onPrev, onNext, closeLightbox } = props;
  const ref = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageSize, setCurrentImageSize] = useState<currentImageSizeType>();
  const [scaleX, setScaleX] = useState(0);
  const [scaleY, setScaleY] = useState(0);
  const [detailCardVisible, setDetailCardVisible] = useState(true);
  const [scaleBorder, setScaleBorder] = useState(0);
  const [insights, setInsights] = useState<FileInsight>(initState);

  const { data, loading, error } = useGetFileImageInsightQuery({
    variables: {
      fileId: image._id,
    },
  });

  if (error) {
    alert(error.message);
  }

  const fileMetaData = data?.GetFileImageInsight.fileMeta;
  const insightsData = data?.GetFileImageInsight.insights;

  useEffect(() => {
    if (fileMetaData && insightsData) {
      setInsights({
        fileMeta: {
          _id: fileMetaData?._id,
          uri: fileMetaData?.uri,
          uri_thumbnail: fileMetaData?.uri_thumbnail,
          meta: {
            size: fileMetaData?.meta.size,
            extension: fileMetaData?.meta.extension,
            contentType: fileMetaData?.meta.contentType,
            width: fileMetaData?.meta.width,
            height: fileMetaData?.meta.height,
          },
        },
        insights: insightsData.map((el: InsightDto) => ({
          _id: el?._id,
          model: el?.model,
          keyword: el?.keyword,
          bbox: el?.bbox || undefined,
        })),
      });
    }
  }, [loading, image._id]);

  const mockInsight = {
    width: 600,
    height: 600,
    label: [{ result: 'dog', xMin: 0, xMax: 100, yMin: 0, yMax: 100 }],
    location: 'Paris',
    id: '44545',
  };

  function handleCurrentImageSize() {
    if (ref.current) {
      setCurrentImageSize({
        width: ref?.current?.clientWidth,
        height: ref?.current?.clientHeight,
      });
    }
  }

  function handleDetailCard() {
    setDetailCardVisible(!detailCardVisible);
    setTimeout(() => {
      handleCurrentImageSize();
    }, 100);
  }

  useEffect(() => {
    handleCurrentImageSize();
    window.addEventListener('resize', handleCurrentImageSize);
    return () => {
      window.removeEventListener('resize', handleCurrentImageSize);
    };
  }, []);

  useEffect(() => {
    if (currentImageSize) {
      setScaleX(currentImageSize?.width / insights.fileMeta.meta.width);
      setScaleY(currentImageSize?.height / insights.fileMeta.meta.height);
      setScaleBorder(3 * scaleX);
    }
  }, [currentImageSize, detailCardVisible]);


  const allTags = insights.insights
    .map((el) => el.keyword)
    .reduce((acc: string[], keyword: string) => {
      if (acc.indexOf(keyword) == -1) acc.push(keyword);
      return acc;
    }, []);

  return (
    <LightboxWrapper>
      <Overlay onClick={closeLightbox} />
      <LightboxCard>
        <LightboxCardLeft ref={containerRef} half={detailCardVisible}>
          <OptionWrapper>
            <InfoButton onClick={handleDetailCard}>
              <InfoCircleOutlined />
            </InfoButton>
          </OptionWrapper>
          <ButtonLeft onClick={onPrev}>
            <CaretLeftOutlined />
          </ButtonLeft>
          <ImageWrapper>
            {insights.insights &&
              insights.insights?.map((insightData) => {
                if (insightData.bbox && currentImageSize) {
                  return (
                    <BoundingBox
                      key={uuid().toString()}
                      xMin={insightData?.bbox?.xmin * scaleX}
                      xMax={insightData?.bbox?.xmax * scaleX}
                      yMin={insightData?.bbox?.ymin * scaleY}
                      yMax={insightData?.bbox?.ymax * scaleY}
                      label={insightData.keyword}
                      scaleBorder={scaleBorder}
                      currentImgWidth={currentImageSize?.width}
                      currentImgHeight={currentImageSize?.height}
                    />
                  );
                }
              })}
            <Image ref={ref} src={image.uri} onLoad={handleCurrentImageSize} />
          </ImageWrapper>
          <ButtonRight onClick={onNext}>
            <CaretRightOutlined />
          </ButtonRight>
        </LightboxCardLeft>
        {detailCardVisible ? (
          <LightboxCardRight>
            <b> Info</b>
            <hr />
            <br />
            <b> Tag</b>
            <br />
            <TagRender tags={allTags} />
            <br />
            <br />
            <b> Details</b>
            <br />
            <Row>
              <Col md={8}>
                <b> Model</b>
              </Col>
              <Col>
                {insights.insights.map((el, index) => (
                  <Tag key={index}>{el.model} </Tag>
                ))}
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={8}>
                <b> Date</b>
              </Col>
              <Col>
                {dayjs(image.createAt).format('MMM DD, YYYY')}
                <br />
                {dayjs(image.createAt).format('ddd,hh:mmA Z')}
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <b> Photo</b>
              </Col>
              <Col>
                {image.original_filename}
                <br /> {insights.fileMeta.meta.width} * {insights.fileMeta.meta.height} px
                <br /> {filesize(insights?.fileMeta.meta.size)}
              </Col>
            </Row>
          </LightboxCardRight>
        ) : null}
      </LightboxCard>
    </LightboxWrapper>
  );
};

export default Lightbox;
