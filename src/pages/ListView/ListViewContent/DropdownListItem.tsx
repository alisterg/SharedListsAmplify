import React, { useRef, useState } from "react";
import { ListItem } from "../../../models";
import styles from "../styles.module.css";
import { IonIcon, IonInput, IonItem } from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  reorderTwoOutline,
} from "ionicons/icons";

interface Props {
  item: ListItem;
  onEditItem: Function;
  onToggleItemComplete: Function;
}

const DropdownListItem: React.FC<Props> = ({
  item,
  onEditItem,
  onToggleItemComplete,
}) => {
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
      <IonIcon
        style={{ paddingTop: "2px" }}
        slot="start"
        color={item.isComplete ? "primary" : "medium"}
        icon={item.isComplete ? checkmarkCircleOutline : ellipseOutline}
        onClick={() => onToggleItemComplete()}
      />
      <IonInput
        onClick={handleSetEditing}
        ref={inputRefEle}
        className={isCurrentlyEditing ? styles.inputEditing : ""}
        value={newTitle}
        onIonChange={(e) => setNewTitle(e.detail.value!)}
        onIonFocus={() => setIsCurrentlyEditing(true)}
        onIonBlur={handleBlur}
      />
      <IonIcon slot="end" icon={reorderTwoOutline} />
    </IonItem>
  );
};

export default DropdownListItem;
