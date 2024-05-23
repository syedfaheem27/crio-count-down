import { FC, ReactElement, useEffect, useRef, useState } from "react";

import CounterForm from "./components/CounterForm";
import Header from "./components/Header";
import DateCard from "./components/DateCard";
import CardsContainer from "./components/CardsContainer";
import {
  getDaysDiff,
  getHoursDiff,
  getMinutesDiff,
  getSecondsDiff,
} from "./utils/dateUtils";

const App: FC = (): ReactElement => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [timer, setTimer] = useState<number>(0);

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [hasExceeded, setHasExceeded] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);

  //Add start and finish dates
  const addDate = (date: Date) => {
    const newDate = new Date(date.getTime() - 8639880000);

    setStartDate(newDate);
    setEndDate(date);
  };

  //Start the timer
  const startTimer = () => {
    if (!endDate) return alert("End Date not yet set!");
    if (endDate < startDate)
      return alert("Can't have a date lesser than the current date!s");

    // When we start a new timer
    if (hasFinished) {
      setHasExceeded(false);
      setHasFinished(false);
    }

    setHasStarted(true);
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const cancelTimer = () => {
    setHasStarted(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setEndDate(null);
    setTimer(0);
  };

  const daysElapsed =
    endDate === null
      ? 0
      : getDaysDiff(startDate, new Date(endDate.getTime() + timer * 1000));

  const hoursElapsed =
    endDate === null
      ? 0
      : getHoursDiff(startDate, new Date(endDate.getTime() + timer * 1000));

  const minutesElapsed =
    endDate === null
      ? 0
      : getMinutesDiff(startDate, new Date(endDate.getTime() + timer * 1000));

  const secsElapsed =
    endDate === null
      ? 0
      : getSecondsDiff(startDate, new Date(endDate.getTime() + timer * 1000));

  useEffect(() => {
    if (endDate && timer * 1000 + startDate.getTime() >= endDate.getTime()) {
      setHasFinished(true);
      return cancelTimer();
    }

    if (
      endDate &&
      getDaysDiff(startDate, new Date(endDate.getTime() + timer * 1000)) >= 100
    ) {
      setHasExceeded(true);
      setHasFinished(true);
      return cancelTimer();
    }
  }, [timer, startDate, endDate, hasStarted]);

  return (
    <div className="container">
      <Header />
      <CounterForm
        addDate={addDate}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        hasStarted={hasStarted}
        cancelTimer={cancelTimer}
      />
      {!hasFinished && (
        <CardsContainer>
          <DateCard value={daysElapsed} label="Days" />
          <DateCard value={hoursElapsed} label="Hours" />
          <DateCard value={minutesElapsed} label="Minutes" />
          <DateCard value={secsElapsed} label="Seconds" />
        </CardsContainer>
      )}
      {hasFinished && !hasExceeded && (
        <p className="end-text">
          💐 The Count down is over! What's next on your adventure? 💐
        </p>
      )}
      {hasExceeded && (
        <p className="end-text">Selected time is more than 100 days😥</p>
      )}
    </div>
  );
};

export default App;
