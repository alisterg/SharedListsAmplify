import React from "react";
import { ListItem } from "../models";

interface Props {
  item: ListItem;
}

const DropdownListItem: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <strong>{item?.title}</strong>
    </div>
  );
};

export default DropdownListItem;
