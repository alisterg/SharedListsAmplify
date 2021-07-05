import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { API, graphqlOperation } from "aws-amplify";
import { listLists } from "../graphql/queries";
import { AllListsResponse } from "../models/ListsResponse";
import { add, arrowForward } from "ionicons/icons";

const Home: React.FC = () => {
  const [lists, setLists] = useState<{ data?: Record<string, any> }>();

  useEffect(() => {
    (async () => {
      const result = await API.graphql(graphqlOperation(listLists));
      setLists({ data: result });
    })();
  }, [lists]);

  if (!lists) return <IonLoading isOpen={true} />;

  const listsToDisplay: AllListsResponse[] = lists.data?.data.listLists.items;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shoppingu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {listsToDisplay.map((list) => (
          <CategoryDropdown key={list.id} list={list} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
