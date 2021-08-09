import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import ListViewContent from "./ListViewContent";
import FabMenu from "./FabMenu";

const ListView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <FabMenu />
        <div style={{ overflow: "scroll", height: "100%" }}>
          <ListViewContent />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withAuthenticator(ListView);
