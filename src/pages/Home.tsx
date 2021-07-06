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
import { DataStore } from "@aws-amplify/datastore";
import {List, ListItem} from "../models";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>();

  // TODO: datastore: use DataStore.observe(ListItem).subscribe
  // for real time subscriptions
  // https://www.youtube.com/watch?v=CXeRQn62Ptw
  // https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js
  
  useEffect(() => {
    (async () => {
      const listsResult = await DataStore.query(List);
      const listItemsResult = await DataStore.query(ListItem);
      
      setLists(listsResult);
    })();
    
    
    // (async () => {
    //   const result = await API.graphql(graphqlOperation(listLists));
    //   setLists({ data: result });
    // })();
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
