import { FC, ReactElement } from "react";

const Header: FC = (): ReactElement => {
  return (
    <header className="header">
      <h1>
        Count Down <span>Timer</span>
      </h1>
    </header>
  );
};

export default Header;
