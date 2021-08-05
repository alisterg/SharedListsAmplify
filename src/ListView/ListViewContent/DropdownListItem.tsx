import React, { useRef, useState } from "react";
import { ListItem } from "../../models";
import styles from "../styles.module.css";
import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {reorderTwoOutline} from "ionicons/icons";

interface Props {
  item: ListItem;
  onEditItem: Function;
}

const DropdownListItem: React.FC<Props> = ({ item, onEditItem }) => {
  const [newTitle, setNewTitle] = useState(item?.title);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);
  const inputRefEle = useRef<HTMLIonInputElement>(null);

  const handleSetEditing = (e: React.MouseEvent) => {
    inputRefEle.current!.focus();
  };

  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    onEditItem(newTitle);
  };

  return (
    <IonItem mode="ios" lines="none">
      <IonInput
        onClick={handleSetEditing}
        ref={inputRefEle}
        className={isCurrentlyEditing ? styles.bgGreen : ""}
        value={newTitle}
        onIonChange={(e) => setNewTitle(e.detail.value!)}
        onIonFocus={() => setIsCurrentlyEditing(true)}
        onIonBlur={handleBlur}
      />
      <IonIcon slot="end" icon={reorderTwoOutline} />
    </IonItem>
    
    // <input
    //   className={isCurrentlyEditing ? "bg-green" : ""}
    //   onClick={handleSetEditing}
    //   ref={inputRefEle}
    //   value={newTitle}
    //   onChange={(e) => setNewTitle(e.target.value)}
    //   onFocus={() => setIsCurrentlyEditing(true)}
    //   onBlur={handleBlur}
    // />
  );
};

export default DropdownListItem;
