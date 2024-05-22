import { FC, ReactElement, useState } from "react";

import CounterForm from "./components/CounterForm";
import Header from "./components/Header";
import DateCard from "./components/DateCard";
import CardsContainer from "./components/CardsContainer";

const App: FC = (): ReactElement => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const addDate = (date: Date) => {
    setStartDate(date);
  };
  return (
    <>
      <Header />
      <CounterForm addDate={addDate} />
      <CardsContainer>
        <DateCard value={0} label="Days" />
        <DateCard value={0} label="Hours" />
        <DateCard value={0} label="Minutes" />
        <DateCard value={0} label="Seconds" />
      </CardsContainer>
    </>
  );
};

export default App;
