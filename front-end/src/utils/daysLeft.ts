export const getNumberOfDays = (start: number, end: number) => {
  const date1 = new Date(Number(start * 1000));
  const date2 = new Date(Number(end * 1000));

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};
