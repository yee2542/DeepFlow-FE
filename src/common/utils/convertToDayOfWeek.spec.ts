import { convertToDayOfWeek } from './convertToDayOfWeek';

describe('utils/convertToDayOfWeek test', () => {
  it('it should return nothing if nDay out of 7', () => {
    const result = convertToDayOfWeek(8);
    expect(result).toEqual('');
  });

  it('it should return Wed if nDay equal to 3', () => {
    const result = convertToDayOfWeek(3);
    expect(result).toEqual('Wed');
  });
});
