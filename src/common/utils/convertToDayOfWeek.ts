export const convertToDayOfWeek = (nDay: number): string => {
  let day = '';
  switch (nDay) {
    case 1:
      day = 'Mon';
      break;
    case 2:
      day = 'Tue';
      break;
    case 3:
      day = 'Wed';
      break;
    case 4:
      day = 'Thu';
      break;
    case 5:
      day = 'Fri';
      break;
    case 6:
      day = 'Sat';
      break;
    case 7:
      day = 'Sun';
      break;
    default:
      break;
  }
  return day;
};
