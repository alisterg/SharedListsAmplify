import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { API, graphqlOperation } from "aws-amplify";
import { listListItems } from "../graphql/queries";
import { ListItem } from "../graphql/API";
import { onCreateListItem } from "../graphql/subscriptions";
import cloneDeep from "lodash/cloneDeep";

const Home: React.FC = () => {
  const [listItems, setListItems] = useState<Array<ListItem>>([]);
  let initialSubscription = null;
  let subscription = null;

  useEffect(() => {
    fetchListItems();
    subscribeListItems();
  }, []);

  useLayoutEffect(() => {
    return () => {
      subscription = null;
    };
  }, []);

  const fetchListItems = async () => {
    const listItemData = (await API.graphql(
      graphqlOperation(listListItems)
    )) as any;

    const items = listItemData.data.listListItems.items;
    setListItems(items);
  };

  /**
   * TODO: this isn't working because the Amplify Admin UI
   * doesn't create items properly?
   * see here: https://github.com/aws-amplify/amplify-js/issues/5115
   * can't use that solution because we don't control the graphql
   * operation, AWS does...
   */
  const subscribeListItems = async () => {
    subscription = (
      (await API.graphql(graphqlOperation(onCreateListItem))) as any
    ).subscribe({
      next: (listItemData: any) => {
        console.log("subsribe hit: ", listItemData)
        if (listItemData.value.data.onCreateListItem) {
          const newItem = listItemData.value.data.onCreateListItem;
          const updatedItems = cloneDeep(listItems);
          updatedItems.push(newItem);
          setListItems(updatedItems);
        }
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
          <div key={item.id}>
            {item.title}<br/>
          </div>
          // <CategoryDropdown key={item.id} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
