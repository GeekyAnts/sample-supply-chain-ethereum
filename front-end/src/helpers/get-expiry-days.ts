function getNumberOfDays(start: string, end: string) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // // One day in milliseconds
  // const oneDay = 1000 * 60 * 60 * 24;

  // // Calculating the time difference between two dates
  // const diffInTime = date2.getTime() - date1.getTime();

  // // Calculating the no. of days between two dates
  // const diffInDays = Math.round(diffInTime / oneDay);

  const diffInMs = +date2 - +date1;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays;
}

export default getNumberOfDays;
