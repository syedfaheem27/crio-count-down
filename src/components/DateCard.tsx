import { FC, ReactElement } from "react";

interface myProps {
  label: string;
  value: number;
}

const DateCard: FC<myProps> = ({ value, label }): ReactElement => {
  return (
    <li className="date-card">
      <h3>{value}</h3>
      <p>{label}</p>
    </li>
  );
};

export default DateCard;
