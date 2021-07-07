import React, { useState } from "react";
import { List, ListItem } from "../models";
import CategoryItem from "./CategoryItem";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
} from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";
import { DataStore } from "@aws-amplify/datastore";

interface Props {
  list: List;
}

const CategoryDropdown: React.FC<Props> = ({ list }) => {
  const [quickAddInp, setQuickAddInp] = useState("");

  const addItemHandler = async () => {
    await DataStore.save(
      new ListItem({
        title: quickAddInp,
        listID: list.id,
      })
    );

    setQuickAddInp("");
  };

  return (
    <div className="container">
      {list.childItems?.map((item: ListItem | null, idx: number) => {
        return <CategoryItem key={idx} item={item} />;
      })}

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
          <IonButton fill="clear" onClick={addItemHandler}>
            <IonIcon icon={arrowForward} color="primary" />
          </IonButton>
        )}
      </IonItem>
    </div>
  );
};

export default CategoryDropdown;
