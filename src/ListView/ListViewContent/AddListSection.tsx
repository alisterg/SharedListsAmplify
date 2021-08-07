import React, { useState } from "react";
import { List } from "../../models";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import { DataStore } from "@aws-amplify/datastore";
import styles from "../styles.module.css";

const AddListSection: React.FC = () => {
  const [quickAddInp, setQuickAddInp] = useState("");

  const handleAddListClick = async () => {
    await DataStore.save(new List({ name: quickAddInp }));
    setQuickAddInp("");
  };

  return (
    <IonItem className={styles.addList}>
      <IonIcon icon={add} slot="start" color="tertiary" />
      <IonInput
        maxlength={50}
        autocapitalize="on"
        autocorrect="on"
        value={quickAddInp}
        placeholder="New category..."
        onIonChange={(e) => setQuickAddInp(e.detail.value!)}
      />
      {quickAddInp && (
        <IonButton fill="clear" onClick={handleAddListClick}>
          <IonIcon icon={arrowForward} color="primary" />
        </IonButton>
      )}
    </IonItem>
  );
};

export default AddListSection;
