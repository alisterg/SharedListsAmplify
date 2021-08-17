import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import ListViewContent from "./ListViewContent";
import FabMenu from "./FabMenu";
import { reload } from "ionicons/icons";

const ListView: React.FC = () => {
  const handleReloadClick = () => window.location.reload();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleReloadClick}>
              <IonIcon icon={reload} />
            </IonButton>
          </IonButtons>
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
