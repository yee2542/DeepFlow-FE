import axios from 'axios';
import { uploadDataType } from '../components/UploadProgress';

//TODO: Change to correct type
export const uploadPhoto = async (dataToUpload: any): Promise<uploadDataType> => {
  const files = new FormData();
  files.append('file', dataToUpload.fileToUpload);
  const url = 'http://localhost:5000/file';
  const config = {
    headers: {
      'content-type':
        'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
    },
  };
  const data = {
    owner: dataToUpload.owner,
    files: files,
  };
  const response = await axios.post(url, data, config);
  return response.data;
};
