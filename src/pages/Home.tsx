import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { DataStore } from "@aws-amplify/datastore";
import { List, ListItem } from "../models";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>();

  // TODO: I think amplify is buggy in the order that I added the services...
  // DataStore isn't working properly
  // https://www.youtube.com/watch?v=CXeRQn62Ptw
  // https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js

  useEffect(() => {
    const subscription = DataStore.observe(List).subscribe(async (msg) => {
      const listsResult = await DataStore.query(List);
      setLists(listsResult);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!lists) return <IonLoading isOpen={true} />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {lists.map((list) => (
          <CategoryDropdown key={list.id} list={list} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
