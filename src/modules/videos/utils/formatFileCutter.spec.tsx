import fileFormatCutter from './fileFormatCutter';

describe('utils/fileFormatCutter', () => {
  it('should return only filename without format', () => {
    const resultMp4 = fileFormatCutter('video/sample.mp4');
    const resultOgc = fileFormatCutter('video/sample.orc');
    expect(resultMp4).toEqual('video/sample');
    expect(resultOgc).toEqual('video/sample');
  });
  it('should return filename correctly', () => {
    const result = fileFormatCutter('video/sample');
    expect(result).toEqual('video/sample');
  });
});
