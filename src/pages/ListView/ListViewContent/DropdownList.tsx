import React, { ReactNode, useRef, useState } from "react";
import { List } from "../../../models";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
} from "@ionic/react";
import {
  chevronDownOutline,
  chevronForwardOutline,
  trashOutline,
} from "ionicons/icons";
import styles from "../styles.module.css";
import { lightHaptic, mediumHaptic } from "../../../helpers/capacitorHelpers";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDeleting } from "../../../store/settings";
import { deleteListAsync } from "../../../store/items";

interface Props {
  list: List;
  isDraggingOver: boolean;
  children: ReactNode[];
  onEditName: Function;
}

const DropdownList: React.FC<Props> = ({
  list,
  isDraggingOver,
  children,
  onEditName,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newTitle, setNewTitle] = useState(list.name);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);
  const inputRefEle = useRef<HTMLIonInputElement>(null);

  const isDeleting = useSelector(selectIsDeleting);
  const dispatch = useDispatch();

  const handleSetEditing = () => {
    inputRefEle.current!.focus();
  };

  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    onEditName(newTitle);
  };

  const handleToggleExpand = async () => {
    setIsExpanded(!isExpanded);
    mediumHaptic();
  };

  const handleDeleteClicked = () => {
    lightHaptic();
    dispatch(deleteListAsync(list));
  };

  return (
    <IonCard color={isDraggingOver ? "light" : "none"}>
      <div className={styles.cardHeader}>
        <IonButtons slot="start" style={{ marginRight: 4 }}>
          <IonButton onClick={handleToggleExpand}>
            <IonIcon
              icon={isExpanded ? chevronDownOutline : chevronForwardOutline}
            />
          </IonButton>
        </IonButtons>

        <IonItem lines="none" color="none">
          <IonCardTitle>
            <IonInput
              onClick={handleSetEditing}
              ref={inputRefEle}
              className={isCurrentlyEditing ? styles.inputEditing : ""}
              value={newTitle}
              onIonChange={(e) => setNewTitle(e.detail.value!)}
              onIonFocus={() => setIsCurrentlyEditing(true)}
              onIonBlur={handleBlur}
            />
          </IonCardTitle>
        </IonItem>

        {isDeleting && (
          <IonButtons slot="end">
            <IonButton onClick={handleDeleteClicked}>
              <IonIcon color="danger" icon={trashOutline} />
            </IonButton>
          </IonButtons>
        )}
      </div>

      {isExpanded && <div className={styles.cardContent}>{children}</div>}
    </IonCard>
  );
};

export default DropdownList;
