import React, { ReactNode } from "react";

interface Props {
  children: ReactNode[];
}

const DropdownList: React.FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default DropdownList;
