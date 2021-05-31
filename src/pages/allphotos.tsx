import AllPhotosPage from 'Modules/photos/pages';
import React from 'react';
import RouterGuard from '../common/components/RouterGuard';

const AllPhotos: React.FC = () => {
  return (
    <RouterGuard>
      <AllPhotosPage data={data} />
    </RouterGuard>
  );
};

export default AllPhotos;
