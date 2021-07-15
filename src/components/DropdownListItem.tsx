import React, { useRef, useState } from "react";
import { ListItem } from "../models";
import "../styles.css";
import { IonInput } from "@ionic/react";

interface Props {
  item: ListItem;
}

const DropdownListItem: React.FC<Props> = ({ item }) => {
  const [newTitle, setNewTitle] = useState(item?.title);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);
  const inputRefEle = useRef<HTMLIonInputElement>(null);

  const handleSetEditing = (e: React.MouseEvent) => {
    inputRefEle.current!.focus();
  };
  
  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    
    // TODO: save to datastore
  }

  return (
    <IonInput
      onClick={handleSetEditing}
      ref={inputRefEle}
      className={isCurrentlyEditing ? "bg-green" : ""}
      value={newTitle}
      onIonChange={(e) => setNewTitle(e.detail.value!)}
      onIonFocus={() => setIsCurrentlyEditing(true)}
      onIonBlur={() => handleBlur()}
    />
  );
};

export default DropdownListItem;
