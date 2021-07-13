import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { List, ListItem } from "../models";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import DropdownListItem from "../components/DropdownListItem";
import { add, arrowForward } from "ionicons/icons";
import AddItemSection from "../components/AddItemSection";
import DropdownList from "../components/DropdownList";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  const [items, setItems] = useState<ListItem[]>();

  useEffect(() => {
    fetchLists();
    fetchItems();

    const listsSubscription = DataStore.observe(List).subscribe((msg) => {
      fetchLists();
    });

    const itemsSubscription = DataStore.observe(ListItem).subscribe((msg) => {
      fetchItems();
    });

    return () => {
      listsSubscription.unsubscribe();
      itemsSubscription.unsubscribe();
    };
  }, []);

  const fetchLists = async () => {
    const listsResult = await DataStore.query(List);
    setLists(listsResult);
  };

  const fetchItems = async () => {
    const itemsResult = await DataStore.query(ListItem);
    setItems(itemsResult);
  };

  const filterItemsForList = (listId: string) =>
    items!.filter((i) => i.listID === listId);
  // await DataStore.query(ListItem, (c) => c.listID("eq", listId));

  const getPageContent = () => {
    if (!lists || !items) return <div>TODO: Show empty state</div>;

    const renderedLists = lists.map((list) => (
      <DropdownList key={list.id}>
        {filterItemsForList(list.id).map((item: ListItem, idx: number) => (
          <DropdownListItem key={idx} item={item} />
        ))}

        <AddItemSection list={list} />
      </DropdownList>
    ));

    return <div>{renderedLists}</div>;
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

      <IonContent fullscreen>{getPageContent()}</IonContent>
    </IonPage>
  );
};

export default withAuthenticator(Home);
