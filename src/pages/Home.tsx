import {
  IonContent,
  IonHeader, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { API, graphqlOperation } from "aws-amplify";
import { listListItems, listLists } from "../graphql/queries";
import { ListItem } from "../graphql/API";
import { onCreateListItem } from "../graphql/subscriptions";
import cloneDeep from "lodash/cloneDeep";
import { createListItem } from "../graphql/mutations";
import { List } from "../models";

export interface GraphQLResult {
  data?: Record<string, any>;
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

const Home: React.FC = () => {
  const [lists, setLists] = useState<GraphQLResult>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await API.graphql(graphqlOperation(listLists));
        setLists({ data: result });
      } catch (e) {
        console.log("Couldn't fetch lists", e);
      }
    };

    fetch();
  }, [lists]);

  if (!lists) return <IonLoading isOpen={true} />;

  const listsToDisplay = lists.data?.data.listLists.items;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shoppingu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {listsToDisplay.map((list: List) => (
          <CategoryDropdown key={list.id} list={list} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
