const fileFormatCutter = (filename: string): string => {
  const result = filename.split('.');
  return result[0];
};
export default fileFormatCutter;
