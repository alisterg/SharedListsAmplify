import React, { useState } from "react";
import { List, ListItem } from "../models";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import { DataStore } from "@aws-amplify/datastore";

const AddListSection: React.FC = () => {
  const [quickAddInp, setQuickAddInp] = useState("");

  const addListHandler = async () => {
    await DataStore.save(new List({ name: quickAddInp }));
    setQuickAddInp("");
  };

  return (
    <IonItem>
      <IonIcon icon={add} slot="start" color="tertiary" />
      <IonInput
        maxlength={50}
        autocapitalize="on"
        autocorrect="on"
        value={quickAddInp}
        placeholder="Add category..."
        onIonChange={(e) => setQuickAddInp(e.detail.value!)}
      />
      {quickAddInp && (
        <IonButton fill="clear" onClick={addListHandler}>
          <IonIcon icon={arrowForward} color="primary" />
        </IonButton>
      )}
    </IonItem>
  );
};

export default AddListSection;
