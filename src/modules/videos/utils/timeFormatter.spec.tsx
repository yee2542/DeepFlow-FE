import { timeFormatter } from './timeFormatter';

describe('utils/TimeFormat', () => {
  it('should return 00:00 when no input is NaN', () => {
    const result = timeFormatter(NaN);
    expect(result).toEqual('00:00');
  });

  it('should return mm and ss', () => {
    const result = timeFormatter(361);
    expect(result).toEqual('6:01');
  });

  it('should return hh mm and ss', () => {
    const result = timeFormatter(14026);
    expect(result).toEqual('3:53:46');
  });
});
