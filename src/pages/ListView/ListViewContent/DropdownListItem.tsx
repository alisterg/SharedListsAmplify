import React, { useRef, useState } from "react";
import { ListItem } from "../../../models";
import styles from "../styles.module.css";
import { IonIcon, IonInput, IonItem } from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  reorderTwoOutline,
  trashOutline,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDeleting } from "../../../store/settings";
import { deleteItemAsync } from "../../../store/items";

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
  const isDeleting = useSelector(selectIsDeleting);
  const dispatch = useDispatch();

  const iconColor = isDeleting
    ? "danger"
    : item.isComplete
    ? "primary"
    : "medium";
  const iconName = isDeleting
    ? trashOutline
    : item.isComplete
    ? checkmarkCircleOutline
    : ellipseOutline;

  const handleSetEditing = (e: React.MouseEvent) => {
    inputRefEle.current!.focus();
  };

  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    onEditItem(newTitle);
  };

  const handleIconClicked = () => {
    if (!isDeleting) return onToggleItemComplete();
    dispatch(deleteItemAsync(item));
  };

  return (
    <IonItem mode="ios" lines="none">
      <IonIcon
        style={{ paddingTop: "2px" }}
        slot="start"
        color={iconColor}
        icon={iconName}
        onClick={handleIconClicked}
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
