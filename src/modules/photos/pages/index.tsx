import Button from 'Components/Button';
import { Loader } from 'Components/Loader';
import LayoutWithSearch from 'Components/Layouts/LayoutWithSearch';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbnailPhoto from '../components/ThumbnailPhoto';
import Link from 'next/link';
import { WrapperImage } from './styled';
import { initialState } from '../models/init';
import { useSelector } from 'react-redux';
import { StoresState } from 'Stores/index';
import Lightbox from '../components/Lightbox';
import {
  RecentFile,
  RecentPreviews,
  useGetRecentFilesQuery,
} from '../../../common/generated/generated-types';
import dayjs from 'dayjs';

const AllPhotosPages: React.FC = () => {
  const [previews, setPreviews] = useState<RecentPreviews[]>([]);
  const [currentImage, setCurrentImages] = useState<RecentFile>(initialState);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const owner = useSelector((state: StoresState) => state.user.user.id);
  const { data, loading, error } = useGetRecentFilesQuery({
    variables: {
      owner: owner,
    },
  });

  let queryData: RecentPreviews[] = [];
  const allImages: RecentFile[] = [];

  const searchResult = useSelector((s: StoresState) => s.instantSearch.result);
  const ids = searchResult.map((el) => el._id);

  if (!error) {
    queryData = data?.GetRecentFiles?.result.map((el: RecentPreviews) => ({
      date: el.date,
      files: el.files?.map((f: RecentFile) => ({
        createAt: f.createAt,
        original_filename: f.original_filename,
        updateAt: f.updateAt,
        uri: f.uri,
        uri_thumbnail: f.uri_thumbnail,
        _id: f._id,
        type: f.type,
      })),
    })) as RecentPreviews[];

    queryData?.forEach((el: RecentPreviews) => {
      if (el.files) allImages.push(...el.files);
    });
  } else {
    alert(error.message);
  }

  useEffect(() => {
    setPreviews(queryData);
  }, [loading]);

  const nextImages = () => {
    //setPreviews([...previews, ...queryData]);
  };

  const openLightbox = (image: RecentFile) => {
    setCurrentImages(image);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setCurrentImages(initialState);
    setLightboxVisible(false);
  };

  const showNext = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const currentIndex = allImages.findIndex((el) => el._id === currentImage._id);
    if (currentIndex >= allImages.length - 1) {
      setLightboxVisible(false);
    } else {
      const nextImage = allImages[currentIndex + 1];
      setCurrentImages(nextImage);
    }
  };

  const showPrev = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const currentIndex = allImages.findIndex((el) => el._id === currentImage._id);
    if (currentIndex <= 0) setLightboxVisible(false);
    else {
      const nextImage = allImages[currentIndex - 1];
      setCurrentImages(nextImage);
    }
  };

  return (
    <LayoutWithSearch title="Photos">
      {lightboxVisible ? (
        <Lightbox
          closeLightbox={closeLightbox}
          image={currentImage}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
      <Link href="/upload">
        <a>
          <Button style={{ marginTop: '3%', marginBottom: '-3%' }}>+ Photo</Button>
        </a>
      </Link>
      <InfiniteScroll
        dataLength={allImages.length}
        next={nextImages}
        hasMore={false}
        loader={<Loader />}
        style={{ overflow: 'hidden' }}>
        <WrapperImage>
          {ids.length != 0 &&
            previews?.map((preview: RecentPreviews) =>
              preview.files
                ?.filter((f) => (ids.length != 0 ? ids.includes(f._id) : true))
                .filter((el) => el.type.includes('image'))
                .map((image: RecentFile) => (
                  <ThumbnailPhoto
                    src={image.uri_thumbnail}
                    key={image._id + '-filter'}
                    createAt={dayjs(image.createAt).toDate()}
                    selected={false}
                    onClick={() => openLightbox(image)}
                  />
                )),
            )}

          {ids.length == 0 &&
            previews?.map((preview: RecentPreviews) =>
              preview.files
                ?.filter((el) => el.type.includes('image'))
                .map((image: RecentFile) => (
                  <ThumbnailPhoto
                    src={image.uri_thumbnail}
                    key={image._id + '-unfilter'}
                    createAt={dayjs(image.createAt).toDate()}
                    selected={false}
                    onClick={() => openLightbox(image)}
                  />
                )),
            )}
        </WrapperImage>
      </InfiniteScroll>
    </LayoutWithSearch>
  );
};

export default AllPhotosPages;
