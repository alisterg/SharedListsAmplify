import React, { ReactNode, useRef, useState } from "react";
import { List } from "../../models";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
} from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import styles from "../styles.module.css";

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

  const handleSetEditing = () => {
    inputRefEle.current!.focus();
  };

  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    onEditName(newTitle);
  };

  return (
    <IonCard color={isDraggingOver ? "light" : "none"}>
      <div className={styles.cardHeader}>
        <IonItem lines="none" color="none">
          <IonButtons slot="start">
            <IonButton onClick={() => setIsExpanded(!isExpanded)}>
              <IonIcon
                icon={isExpanded ? chevronDownOutline : chevronForwardOutline}
              />
            </IonButton>
          </IonButtons>
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
      </div>

      {isExpanded && <div className={styles.cardContent}>{children}</div>}
    </IonCard>
  );
};

export default DropdownList;
