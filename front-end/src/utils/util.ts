export const getCurrentEpoch = () => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  return secondsSinceEpoch;
};

export const getCustomDateEpoch = (date: string) => {
  var someDate = new Date(date);

  return someDate.getTime();
};
