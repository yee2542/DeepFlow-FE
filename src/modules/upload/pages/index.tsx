import React, { useEffect, useState } from 'react';
import { Col, Layout, Row } from 'antd';
import { UploadWrapper, Image, BackButton } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import UploadProgress from '../components/UploadProgress';
import { StoresState } from 'Stores/index';
import { getUploadProgress, uploadFileData } from '../reducer/uploadReducer/actions';
import { FileUpload } from '../model/types';
import { v4 as uuidv4 } from 'uuid';
import { uploadActions } from '../reducer/uploadReducer';
import SelectFileButton from '../components/SelectFileButton';
import { InputLine } from 'Styles/global';
import { WrapperImage } from '../../photos/pages/styled';
import UploadButton from '../components/UploadButton';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FileListResponseDTO } from 'fluentsearch-types';
import { Album } from '../../album/reducer/albumReducer/types';
import { useRouter } from 'next/router';

const UploadPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Content } = Layout;
  const [files, setFiles] = useState<File[]>([]);
  const [groupGenerated, setGroupGenerated] = useState<string>('');
  const [album, setAlbum] = useState<Album>({
    name: '',
    id: '',
    albumFiles: [],
    label: [],
    thumbnail_uri: '',
    owner: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUpload[]>([]);
  const [filesResponse, setFilesResponse] = useState<FileListResponseDTO[]>([]);

  const owner = useSelector((state: StoresState) => state.user.user.id);
  const group = useSelector((state: StoresState) => state.upload.present.group);
  const pendingQueue = useSelector((state: StoresState) => state.upload.pendingQueue);
  const fulfillQueue = useSelector((state: StoresState) => state.upload.fulfillQueue);

  useEffect(() => {
    getUploadProgress();
  }, [pendingQueue, fulfillQueue]);

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const rawFiles = e.target.files;
    const groupName = uuidv4();
    setGroupGenerated(groupName);

    if (rawFiles) {
      let type: FileUpload['type'] = 'single';
      if (rawFiles.length > 0) type = 'multiple';

      for (const file of rawFiles) {
        const newFile = {
          _id: uuidv4() as string,
          progress: 0,
          originFilename: file.name,
          createAt: new Date().toString(),
          type: type,
          group: groupName,
          state: 'waiting',
        } as FileUpload;
        setFilesToUpload((prevState) => [...prevState, newFile]);
        setFiles((prevState) => [...prevState, file]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlbum({ ...album, name: e.target.value });
  };

  useEffect(() => {
    setAlbum({ ...album, id: uuidv4(), owner: owner });
  }, []);

  useEffect(() => {
    dispatch(uploadActions.setPendingQueue(filesToUpload));
    uploadFileData(groupGenerated, files).then((response) => {
      setFilesResponse([...response]);
    });
    setFilesResponse([]);
    setFilesToUpload([]);
  }, [groupGenerated]);

  useEffect(() => {
    if (filesResponse.length > 0) {
      console.log(filesResponse);
      const filteredThumbnail = filesResponse
        .flatMap((file) => {
          return file;
        })
        .map((el) => {
          return el.thumbnail_uri;
        });
      setImages([...images, ...filteredThumbnail]);

      const filteredIDFilesResponse = filesResponse
        .flatMap((file) => {
          return file;
        })
        .map((el) => {
          return el._id;
        });
      setAlbum((prevState) => ({
        ...prevState,
        albumFiles: [...filteredIDFilesResponse],
      }));
    }
  }, [filesResponse]);

  return (
    <Layout>
      <UploadWrapper>
        <BackButton
          onClick={() => {
            router.push('/allphotos');
          }}>
          <ArrowLeftOutlined style={{ fontSize: '1.5rem' }} />
        </BackButton>
        <Content style={{ marginTop: '5%' }}>
          <h2 style={{ marginBottom: '2%' }}>Upload Photos</h2>
          <Row justify="space-between">
            <Col span={10} style={{ marginBottom: '1em' }}>
              <InputLine
                placeholder="Album Name"
                value={album.name}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <UploadButton onFileOnChange={handleFileOnChange} />
            </Col>
          </Row>
          <hr />

          <Row justify="center" align="middle">
            {files.length > 0 ? (
              <Col>
                <WrapperImage>
                  {images.map((el, index) => (
                    <Image src={el} key={index} />
                  ))}
                </WrapperImage>
              </Col>
            ) : (
              <Col style={{ marginTop: '15%' }}>
                <SelectFileButton onChange={handleFileOnChange} />
              </Col>
            )}
          </Row>
        </Content>
      </UploadWrapper>
      {files.length > 0 ? <UploadProgress group={group} total={files.length} /> : null}
    </Layout>
  );
};

export default UploadPage;
