import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { API, graphqlOperation } from "aws-amplify";
import { listListItems } from "../graphql/queries";
import { ListItem } from "../graphql/API";
import { onCreateListItem } from "../graphql/subscriptions";
import cloneDeep from "lodash/cloneDeep";

const Home: React.FC = () => {
  const [listItems, setListItems] = useState<Array<ListItem>>([]);

  useEffect(() => {
    fetchListItems();
    subscribeListItems();
  }, []);

  const fetchListItems = async () => {
    const listItemData = (await API.graphql(
      graphqlOperation(listListItems)
    )) as any;

    const items = listItemData.data.listListItems.items;
    setListItems(items);
  };

  const subscribeListItems = async () => {
    (await API.graphql(
      graphqlOperation(onCreateListItem)
    ) as any).subscribe({
      next: (listItemData: any) => {
        debugger
        const newItem = listItemData.value.data.onCreateListItem;
        const updatedItems = cloneDeep(listItems);
        updatedItems.push(newItem);
        setListItems(updatedItems);
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopperize</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hey</IonTitle>
          </IonToolbar>
        </IonHeader>

        {listItems.map((item) => (
          <CategoryDropdown key={item.id} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
