import React, { useState } from "react";
import { List, ListItem } from "../models";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import { DataStore } from "@aws-amplify/datastore";

interface Props {
  list: List;
}

const AddItemSection: React.FC<Props> = ({ list }) => {
  const [quickAddInp, setQuickAddInp] = useState("");

  const handleAddItemClick = async () => {
    await DataStore.save(
      new ListItem({
        title: quickAddInp,
        listID: list.id,
      })
    );

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
        placeholder="Add item..."
        onIonChange={(e) => setQuickAddInp(e.detail.value!)}
      />
      {quickAddInp && (
        <IonButton fill="clear" onClick={handleAddItemClick}>
          <IonIcon icon={arrowForward} color="primary" />
        </IonButton>
      )}
    </IonItem>
  );
};

export default AddItemSection;
