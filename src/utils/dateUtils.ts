const secsInMin = 60;
const secsInHour = 60 * secsInMin;
const secsInDay = 24 * secsInHour;

export const getDaysDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  return Math.floor(diff / secsInDay);
};

export const getHoursDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  const remainingTime = diff % secsInDay;

  return Math.floor(remainingTime / (secsInHour * 1000));
};

export const getMinutesDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  const remainingTime = diff % secsInHour;

  return Math.floor(remainingTime / (secsInMin * 1000));
};

export const getSecondsDiff = (date1: Date, date2: Date): number => {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();

  const diff = Math.abs(ts1 - ts2);

  const remainingTime = diff % secsInMin;

  return remainingTime;
};
