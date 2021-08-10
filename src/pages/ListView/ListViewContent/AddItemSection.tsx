import React, { useState } from "react";
import { List } from "../../../models";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { addItemAsync } from "../../../store/items";
import { hideKeyboard, mediumHaptic } from "../../../helpers/capacitorHelpers";

interface Props {
  list: List;
  itemCount: number;
}

const AddItemSection: React.FC<Props> = ({ list, itemCount }) => {
  const [quickAddInp, setQuickAddInp] = useState("");
  const dispatch = useDispatch();

  const handleAddItemClick = async () => {
    dispatch(addItemAsync(quickAddInp, list.id, itemCount));
    hideKeyboard();
    mediumHaptic();
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
