import React, { useState } from "react";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import styles from "../styles.module.css";
import { useDispatch } from "react-redux";
import { addListAsync } from "../../../store/items";
import { hideKeyboard, mediumHaptic } from "../../../helpers/capacitorHelpers";

const AddListSection: React.FC = () => {
  const [quickAddInp, setQuickAddInp] = useState("");
  const dispatch = useDispatch();

  const handleAddListClick = async () => {
    dispatch(addListAsync(quickAddInp));
    hideKeyboard();
    mediumHaptic();
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
