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

const getHours = (timer: number) => {
  const remainingTime = timer % (24 * 60 * 60);

  return Math.floor(remainingTime / (60 * 60));
};

const getMins = (timer: number) => {
  const remainingTime = timer % (60 * 60);

  return Math.floor(remainingTime / 60);
};

const getSecs = (timer: number) => {
  const remainingTime = timer % 60;

  return remainingTime;
};

const App: FC = (): ReactElement => {
  const startDate = useState<Date>(new Date())[0];
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);

  const addDate = (date: Date) => {
    setEndDate(date);
  };

  const startTimer = () => {
    if (!endDate) return alert("End Date not yet set!");
    if (endDate < startDate)
      return alert("Can't have a date lesser than the current date!s");

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
    setTimer(0);
  };

  const daysElapsed =
    startDate === null ? 0 : Math.floor(timer / (24 * 60 * 60));

  const hoursElapsed = startDate === null ? 0 : getHours(timer);

  const minutesElapsed = startDate === null ? 0 : getMins(timer);

  const secsElapsed = startDate === null ? 0 : getSecs(timer);

  useEffect(() => {
    if (endDate && timer * 1000 + startDate.getTime() === endDate.getTime()) {
      setHasFinished(true);
      return cancelTimer();
    }

    const timeElapsedMS = timer * 1000 + startDate.getTime();

    if (Math.floor(timeElapsedMS / (24 * 60 * 60 * 1000)) >= 100) {
      setHasFinished(true);
      return cancelTimer();
    }
  }, [timer, startDate, endDate]);

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
      <CardsContainer>
        <DateCard value={daysElapsed} label="Days" />
        <DateCard value={hoursElapsed} label="Hours" />
        <DateCard value={minutesElapsed} label="Minutes" />
        <DateCard value={secsElapsed} label="Seconds" />
      </CardsContainer>
    </div>
  );
};

export default App;
