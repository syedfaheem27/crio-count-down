export const getDaysDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  return Math.floor(diff / (24 * 60 * 60 * 1000));
};

export const getHoursDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  const remainingTime = diff % (24 * 60 * 60 * 1000);

  return Math.floor(remainingTime / (60 * 60 * 1000));
};

export const getMinutesDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  const remainingTime = diff % (60 * 60 * 1000);

  return Math.floor(remainingTime / (60 * 1000));
};
