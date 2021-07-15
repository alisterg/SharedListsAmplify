import {
  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { List, ListItem } from "../models";
import { withAuthenticator } from "@aws-amplify/ui-react";
import DropdownListItem from "../components/DropdownListItem";
import AddItemSection from "../components/AddItemSection";
import DropdownList from "../components/DropdownList";
import AddListSection from "../components/AddListSection";
import { Auth } from "aws-amplify";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  const [items, setItems] = useState<ListItem[]>();

  useEffect(() => {
    fetchLists();
    fetchItems();

    const listsSubscription = DataStore.observe(List).subscribe(() => {
      fetchLists();
    });

    const itemsSubscription = DataStore.observe(ListItem).subscribe(() => {
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

  const handleSignOutClick = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  const getPageContent = () => {
    if (!lists || !items) return <div>TODO: Show empty state</div>;

    const renderedLists = lists.map((list) => (
      <DropdownList key={list.id}>
        <IonCardTitle>{list.name}</IonCardTitle>
        {filterItemsForList(list.id).map((item: ListItem, idx: number) => (
          <DropdownListItem key={idx} item={item} />
        ))}

        <AddItemSection list={list} />
      </DropdownList>
    ));

    return (
      <div>
        {renderedLists}
        <AddListSection />
      </div>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end" className="signout-button">
            <div onClick={handleSignOutClick} className="signout-button">
              Sign Out
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{getPageContent()}</IonContent>
    </IonPage>
  );
};

export default withAuthenticator(Home);
