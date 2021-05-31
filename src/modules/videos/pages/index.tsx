import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import LayoutWithSearch from '../../../common/components/Layouts/LayoutWithSearch';
import { Loader } from '../../../common/components/Loader';
import {
  RecentFile,
  RecentPreviews,
  useGetRecentFilesQuery,
} from '../../../common/generated/generated-types';
import { StoresState } from '../../../common/stores';
import ThumbnailPhoto from '../../photos/components/ThumbnailPhoto';
import { WrapperImage } from '../../photos/pages/styled';
import { useRouter } from 'next/router';
import Button from '../../../common/components/Button';

const VideosPage: React.FC = () => {
  const router = useRouter();

  const [previews, setPreviews] = useState<RecentPreviews[]>([]);
  const owner = useSelector((state: StoresState) => state.user.user.id);

  const { data, loading, error } = useGetRecentFilesQuery({
    variables: {
      owner: owner,
    },
  });

  let queryData: RecentPreviews[] = [];
  const allVideos: RecentFile[] = [];

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

    queryData?.map((el: RecentPreviews) => {
      el.files?.filter((d) => {
        if (d.type === 'video') return d;
      });
      if (el.files) allVideos.push(...el.files);
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

  return (
    <LayoutWithSearch title="Videos">
      <Link href="/upload">
        <a>
          <Button style={{ marginTop: '3%', marginBottom: '-3%' }}>+ Video</Button>
        </a>
      </Link>
      <InfiniteScroll
        dataLength={allVideos.length}
        next={nextImages}
        hasMore={false}
        loader={<Loader />}
        style={{ overflow: 'hidden' }}>
        <WrapperImage>
          {ids.length != 0 &&
            previews?.map((preview: RecentPreviews) =>
              preview.files
                ?.filter((f) => (ids.length != 0 ? ids.includes(f._id) : true))
                .filter((el) => el.type === 'video')
                .map((image: RecentFile) => (
                  <ThumbnailPhoto
                    src={image.uri_thumbnail}
                    key={image._id + '-filter'}
                    createAt={dayjs(image.createAt).toDate()}
                    selected={false}
                    onClick={() => router.push(`/video=${image._id}`)}
                  />
                )),
            )}

          {ids.length == 0 &&
            previews?.map((preview: RecentPreviews) =>
              preview.files
                ?.filter((el) => el.type === 'video')
                .map((image: RecentFile) => (
                  <ThumbnailPhoto
                    src={image.uri_thumbnail}
                    key={image._id + '-unfilter'}
                    createAt={dayjs(image.createAt).toDate()}
                    selected={false}
                    onClick={() => router.push(`/video=${image._id}`)}
                  />
                )),
            )}
        </WrapperImage>
      </InfiniteScroll>
    </LayoutWithSearch>
  );
};

export default VideosPage;
