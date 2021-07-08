import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { DataStore } from "@aws-amplify/datastore";
import { List } from "../models";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  // https://www.youtube.com/watch?v=CXeRQn62Ptw
  // https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js

  useEffect(() => {
    fetchLists();
    // TODO: this is not including ListItems which I think is why it isn't working
    // 
    const subscription = DataStore.observe(List).subscribe((msg) => {
      fetchLists();
      console.log("Subscription hit: ", msg);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLists = async () => {
    const listsResult = await DataStore.query(List);
    console.log("Lists: ", listsResult);
    setLists(listsResult);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end">
            <AmplifySignOut />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {lists ? (
          lists.map((list) => <CategoryDropdown key={list.id} list={list} />)
        ) : (
          <div>TODO: Show empty state</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withAuthenticator(Home);
