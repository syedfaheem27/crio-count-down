import { FC, ReactElement } from "react";

interface myProps {
  children: ReactElement[];
}

const CardsContainer: FC<myProps> = ({ children }): ReactElement => {
  return (
    <section className="date-cards">
      <ul className="cards-container">{children}</ul>
    </section>
  );
};

export default CardsContainer;
