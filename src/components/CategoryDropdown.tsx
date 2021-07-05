import React, { useEffect, useState } from "react";
import { ListItem } from "../models";
import CategoryItem from "./CategoryItem";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
} from "@ionic/react";
import { AllListsResponse } from "../models/ListsResponse";
import { add, arrowForward } from "ionicons/icons";
import { API, graphqlOperation } from "aws-amplify";
import { createListItem } from "../graphql/mutations";

interface Props {
  list: AllListsResponse;
}

const CategoryDropdown: React.FC<Props> = ({ list }) => {
  const [quickAddInp, setQuickAddInp] = useState("");

  useEffect(() => {
    console.log("LSIT :", list);
  }, []);

  const addItemHandler = async () => {
    await API.graphql(
      graphqlOperation(createListItem, {
        input: {
          title: quickAddInp,
          listID: list.id,
        },
      })
    );

    setQuickAddInp("");
  };

  if (!list || !list.childItems) return <IonLoading isOpen={true} />;

  return (
    <div className="container">
      {list.childItems?.items.map((item: ListItem | null) => {
        return <CategoryItem item={item} />;
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
