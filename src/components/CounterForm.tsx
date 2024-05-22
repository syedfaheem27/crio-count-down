import { FC, ReactElement, useEffect, useState } from "react";

interface myProps {
  addDate: (date: Date) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  cancelTimer: () => void;
  hasStarted: boolean;
}

const CounterForm: FC<myProps> = ({
  addDate,
  startTimer,
  pauseTimer,
  hasStarted,
  cancelTimer,
}): ReactElement => {
  const [isPaused, setIsPaused] = useState<boolean | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleCancelTimer();
    addDate(new Date(e.target.value));
  }

  function toggleIsPaused() {
    setIsPaused((is) => (isPaused === null ? true : !is));
  }

  function handleCancelTimer() {
    setIsPaused(null);
    cancelTimer();
  }

  useEffect(() => {
    if (!hasStarted || isPaused === null) return;

    if (isPaused) pauseTimer();
    else startTimer();
  }, [hasStarted, isPaused]);

  return (
    <section className="form-container">
      <form className="form">
        <input
          type="datetime-local"
          name="date"
          id="date"
          onChange={handleChange}
        />
        {!hasStarted && (
          <button type="button" onClick={startTimer}>
            Start Timer
          </button>
        )}
        {hasStarted && (
          <div>
            <button type="button" onClick={toggleIsPaused}>
              {isPaused ? "Restart timer" : "Pause timer"}
            </button>
            <button type="button" onClick={handleCancelTimer}>
              Cancel Timer
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default CounterForm;
