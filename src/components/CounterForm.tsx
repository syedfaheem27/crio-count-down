import { FC, ReactElement, useState } from "react";

interface myProps {
  addDate: (date: Date) => void;
}

const CounterForm: FC<myProps> = ({ addDate }): ReactElement => {
  const [currDate, setCurrDate] = useState<Date>(new Date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrDate(new Date(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addDate(currDate);
  };
  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input type="date" name="date" id="date" onChange={handleChange} />
        <button>Start Timer</button>
      </form>
    </section>
  );
};

export default CounterForm;
